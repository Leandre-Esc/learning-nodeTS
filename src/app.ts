import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from "express-rate-limit";
import {registerSwagger} from "./plugins/swagger.js";
import {healthRouter} from "./modules/health/health.routes.js";

export function buildApp() {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(
        rateLimit({
            windowMs: 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false
        })
    )

    registerSwagger(app)

    app.use('/api/v1', healthRouter)

    return app
}