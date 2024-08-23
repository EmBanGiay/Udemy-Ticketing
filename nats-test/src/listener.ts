import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://127.0.0.1:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    const options = stan.subscriptionOptions().setManualAckMode(true);
    const subscription = stan.subscribe(
        'ticket:created',
        'order-service-queue-group'
    );

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        if(typeof data === 'string'){
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
        }

        msg.ack();//send if error occurs
    })
});


process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());