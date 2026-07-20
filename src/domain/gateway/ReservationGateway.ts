import { Reservation } from "../entity/Reservation";

export interface ReservationGateway{
    save(reservation: Reservation): Promise <void>;
}