import {z} from "zod";

export const createUserSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
})

export const updateUserSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    username: z.string().min(3).optional(),
    email: z.email().optional(),
    password: z.string().min(8).optional(),
})

export const userIDSchema = z.object({
    id: z.uuid()
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>