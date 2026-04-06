import {prisma} from "../../db/prisma.js";
import {CreateUserInput, UpdateUserInput} from "./user.schema.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12

const userSelect = {
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    password: false,
    createdAt: true,
    updatedAt: true,
} as const

export class UserService {
    async findAll() {
        return prisma.user.findMany({select: userSelect})
    }

    async findByID(id: string) {
        const user = await prisma.user.findUnique({
            where: {id},
            select: userSelect
        })

        if (!user) {
            const err = new Error('User not found in database') as Error & { statusCode: number }
            err.statusCode = 404
            throw err
        }

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {email},
            select: userSelect
        })

        if (!user) {
            const err = new Error('User not found in database') as Error & { statusCode: number }
            err.statusCode = 404
            throw err
        }

        return user
    }

    async create(input: CreateUserInput) {
        const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS)

        return prisma.user.create({
            data: {...input, password: hashedPassword},
            select: userSelect
        })
    }

    async update(id: string, input: UpdateUserInput) {
        await this.findByID(id)

        const data = {...input}

        if (input.password) {
            data.password = await bcrypt.hash(input.password, SALT_ROUNDS)
        }

        return prisma.user.update({
            where: {id},
            data,
            select: userSelect
        })
    }

    async delete(id: string) {
        await this.findByID(id)

        return prisma.user.delete({where: {id}})
    }
}