import { Publisher, Subjects, TicketUpdatedEvent } from "@ebg_ticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}

