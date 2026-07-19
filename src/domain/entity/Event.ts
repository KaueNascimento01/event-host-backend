export class Event {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly description: string,
    ) {
        this.validate();
    }

    private validate(): void {
        // Validação - id
        if (!this.id || this.id.trim() === "") {
            throw new Error("O ID do evento é obrigatório");
        }

        // Validação - name
        if (!this.name || this.name.trim() === "") {
            throw new Error("O nome do evento é obrigatório");
        }

        // Validação - latitude
        if (typeof this.latitude !== "number" || Number.isNaN(this.latitude)) {
            throw new Error("A latitude do evento é obrigatória e deve ser um número");
        }
        if (this.latitude < -90 || this.latitude > 90) {
            throw new Error("A latitude do evento deve estar entre -90 e 90");
        }

        // Validação - longitude
        if (typeof this.longitude !== "number" || Number.isNaN(this.longitude)) {
            throw new Error("A longitude do evento é obrigatória e deve ser um número");
        }
        if (this.longitude < -180 || this.longitude > 180) {
            throw new Error("A longitude do evento deve estar entre -180 e 180");
        }
    }
}