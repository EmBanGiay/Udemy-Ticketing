import { Publisher, OrderCreatedEvent, Subjects } from '@ebg_ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}

