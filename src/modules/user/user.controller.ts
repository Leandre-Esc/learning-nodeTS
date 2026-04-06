import {NextFunction, Request, Response} from 'express'
import {UserService} from "./user.service.js";
import {userIDSchema} from "./user.schema.js";

const userService = new UserService()

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users = await userService.findAll()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

export async function getByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const {id} = userIDSchema.parse(req.params)
        const user = await userService.findByID(id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}