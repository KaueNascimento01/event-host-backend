import { Hotel } from "../entity/Hotel";

export interface HotelGateway{
    findById(id: string): Promise<Hotel | null>;
    findAll(): Promise<Hotel[]>
}