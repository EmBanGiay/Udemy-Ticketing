import { Publisher, Subjects, TicketCreatedEvent } from "@ebg_ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}

