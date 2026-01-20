import { defineEventHandler, readBody, createError } from 'h3'
import { ZodError } from 'zod'
import { registerSchema } from '../../../app/schemas/register.schema'
import prisma from '../../db'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        const validatedData = registerSchema.parse(body)

        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        })

        if (existingUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Conflict',
                message: 'User with this email already exists',
            })
        }

        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: validatedData.password,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,

            },
        })

        return {
            success: true,
            message: 'User registered successfully',
            data: {
                user,
            },
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                message: 'Validation failed',
                data: {
                    errors: error.issues.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                },
            })
        }

        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                statusMessage: 'Conflict',
                message: 'User with this email already exists',
            })
        }


        if (error && typeof error === 'object' && 'statusCode' in error) {
            throw error
        }


        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'An unexpected error occurred',
        })
    }
})
