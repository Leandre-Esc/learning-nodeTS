import {prisma} from "./db/prisma.js";
import {buildApp} from "./app.js";
import {env} from "./config/env.js";

async function start() {
    await prisma.$connect()
    console.log('Database connected');

    const app = buildApp()

    app.listen(env.PORT, env.HOST, () => {
        console.info(`Server running at http://${env.HOST}:${env.PORT}`);
        console.info(`Swagger UI at http://${env.HOST}:${env.PORT}/docs`);
    })
}

start().catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit()
})