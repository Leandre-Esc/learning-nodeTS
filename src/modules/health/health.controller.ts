import type {NextFunction, Request, Response} from 'express';
import {HealthService} from "./health.service.js";

const healthService = new HealthService();

export async function pingHandler(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const data = await healthService.Ping()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}