export class Reservation{
    constructor(
        public readonly id: string,
        public readonly employeeId: string,
        public readonly hotelId: string,
        public readonly eventId: string,
    ) {
        this.validate();
    }

    private validate(): void {
        // Validação - id da reserva
        if (!this.id || this.id.trim() === "") {
            throw new Error("O ID da reserva é obrigatório");
        }

        // Validação - employeeId
        if (!this.employeeId || this.employeeId.trim() === "") {
            throw new Error("O ID do funcionário é obrigatório");
        }

        // Validação - hotelId
        if (!this.hotelId || this.hotelId.trim() === "") {
            throw new Error("O ID do hotel é obrigatório");
        }

        // Validação - eventId 
        if (!this.eventId || this.eventId.trim() === "") {
            throw new Error("O ID do evento é obrigatório");
        }
    }
}