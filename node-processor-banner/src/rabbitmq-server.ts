import { Connection, Channel, connect, Message } from "amqplib";

export default class RabbitmqServer {
    constructor(private uri: string, private conn?: Connection, private channel?: Channel) { }

    async start(): Promise<void> {
        this.conn = await connect(this.uri);
        this.channel = await this.conn.createChannel();
    }

    async publishInQueue(queue: string, message: string) 
    {
        return this.channel?.sendToQueue(queue, Buffer.from(message));
    }

    async publishInExchange(exchange: string, routingKey: string, message: string): Promise<boolean> 
    {
        return this.channel?.publish(exchange, routingKey, Buffer.from(message)) as boolean;
    }

    async consume(queue: string, callback: (msg: Message) => void) {
        return this.channel?.consume(queue, (msg) => {
            if (msg != null) {
                callback(msg);
                this.channel?.ack(msg);
            } else {
                console.log('Erro ao consumir fila')
            }
        });
    }
}