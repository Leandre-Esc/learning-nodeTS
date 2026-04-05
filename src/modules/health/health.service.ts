import {prisma} from "../../db/prisma.js";

export interface PingResponse {
    status: 'ok'
    timestamp: string
    uptime: number
    db: 'connected' | 'disconnected'
}

export class HealthService {
    async Ping(): Promise<PingResponse> {
        let dbStatus: 'connected' | 'disconnected' = 'disconnected'

        try {
            await prisma.$queryRaw`SELECT 1`
            dbStatus = 'connected'
        } catch {
            dbStatus = 'disconnected'
        }

        return {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            db: dbStatus
        }
    }
}