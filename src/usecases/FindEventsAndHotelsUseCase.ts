import { EventGateway } from "../domain/gateway/EventGateway";
import { HotelGateway } from "../domain/gateway/HotelGateway";
import { Event } from "../domain/entity/Event";
import { Hotel } from "../domain/entity/Hotel";

export interface HotelWithDistance {
    hotel: Hotel;
    distanceInKm: number;
}

export interface EventWithHotels {
    event: Event;
    hotels: HotelWithDistance[];
}

interface FindEventsAndHotelsOutput {
    events: EventWithHotels[];
}

interface CityInput {
    city: string;
}

export class FindEventsAndHotelsUseCase {
    constructor(
        private readonly hotelGateway: HotelGateway,
        private readonly eventGateway: EventGateway
    ) {}

    async execute(input: CityInput): Promise<FindEventsAndHotelsOutput> {
        const cityEvents = await this.eventGateway.findByCity(input.city);
        if (!cityEvents || cityEvents.length === 0) {
            throw new Error(`Nenhum evento encontrado para a cidade: ${input.city}`);
        }

        const cityHotels = await this.hotelGateway.findByCity(input.city);
        if (!cityHotels || cityHotels.length === 0) {
            throw new Error(`Nenhum hotel parceiro encontrado para a cidade: ${input.city}`);
        }

        const proximityEvents = this.calculateProximities(cityEvents, cityHotels);

        return { events: proximityEvents };
    }

    private haversineForm(lat1: number, long1: number, lat2: number, long2: number): number {
        const radiusEarthInKm = 6371;
        const lat1InRad = lat1 * (Math.PI / 180);
        const lat2InRad = lat2 * (Math.PI / 180);
        const long1InRad = long1 * (Math.PI / 180);
        const long2InRad = long2 * (Math.PI / 180);

        const deltaLat = lat2InRad - lat1InRad;
        const deltaLong = long2InRad - long1InRad;

        const intermediateValueA =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(lat1InRad) * Math.cos(lat2InRad) *
            Math.sin(deltaLong / 2) ** 2;

        const intermediateValueC = 2 * Math.atan2(Math.sqrt(intermediateValueA), Math.sqrt(1 - intermediateValueA));

        return radiusEarthInKm * intermediateValueC;
    }

    private calculateProximities(events: Event[], hotels: Hotel[]): EventWithHotels[] {
        const proximityEvents = events.map((event) => {
            const proximityHotels = hotels.map((hotel) => {
                const distanceHotelEvent = this.haversineForm(
                    event.latitude,
                    event.longitude,
                    hotel.latitude,
                    hotel.longitude
                );

                return {
                    hotel,
                    distanceInKm: Number(distanceHotelEvent.toFixed(2))
                };
            });

            return {
                event,
                hotels: proximityHotels
            };
        });

        return proximityEvents;
    }
}