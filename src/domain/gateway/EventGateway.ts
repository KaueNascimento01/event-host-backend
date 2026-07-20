import { Event } from "../entity/Event";

export interface EventGateway{
    findById(id: string): Promise<Event | null>;
    findByCity(city: string): Promise<Event[]>;
}