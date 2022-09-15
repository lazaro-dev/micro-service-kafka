import express from "express"
import RabbitmqServer from "./rabbitmq-server"
import { router } from "./routes"
import { PrismaClient } from '@prisma/client';

const app = express()

app.use(express.json())
app.use(router)

const consumer = async () => {
    const server = new RabbitmqServer('amqp://admin:admin@localhost:5672');
    await server.start();
    await server.consume('default', async (message) => {
        const prisma = new PrismaClient()

        await prisma.bannerObject.create({
            data: {
              object: message.content.toString()
            },
          })
    });
}

consumer();

export { app }