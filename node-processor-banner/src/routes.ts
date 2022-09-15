import { Router } from "express";

const router = Router()


router.get('/', (req, res) => {
    //uri: amqp://admin:admin@rabbitmq:5672
    res.send('home')
})

export { router }