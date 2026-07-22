import { EmployeeGateway } from "../domain/gateway/EmployeeGateway";
import { HotelGateway } from "../domain/gateway/HotelGateway";
import { EventGateway } from "../domain/gateway/EventGateway";
import { ReservationGateway } from "../domain/gateway/ReservationGateway";
import { Reservation } from "../domain/entity/Reservation";

export interface ReservationInput {
    employeeId: string;
    hotelId: string;
    eventId: string;
}

export class CreateReservationUseCase {
    constructor(
        private readonly employeeGateway: EmployeeGateway,
        private readonly hotelGateway: HotelGateway,
        private readonly eventGateway: EventGateway,
        private readonly reservationGateway: ReservationGateway
    ) {}

    async execute(input: ReservationInput): Promise<Reservation> {
        const employee = await this.employeeGateway.findById(input.employeeId);
        if (!employee) {
            throw new Error("Funcionário não encontrado");
        }
        const hotel = await this.hotelGateway.findById(input.hotelId);
        if (!hotel) {
            throw new Error("Hotel não encontrado");
        }
        const event = await this.eventGateway.findById(input.eventId);
        if (!event) {
            throw new Error("Evento não encontrado");
        }

        const reservation = new Reservation(
            crypto.randomUUID(),
            employee.id,
            hotel.id,
            event.id
        );

        await this.reservationGateway.save(reservation);

        return reservation;
    }
}