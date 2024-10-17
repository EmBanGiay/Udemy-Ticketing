import { Subjects, Publisher, OrderCancelledEvent } from "@ebg_ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}