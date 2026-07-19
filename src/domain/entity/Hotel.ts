export class Hotel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly address: string,
        public readonly latitude: number,
        public readonly longitude: number,
    ) {
        this.validate();
    }

    private validate(): void {
        // Validação - id
        if (!this.id || this.id.trim() === "") {
            throw new Error("O ID do hotel é obrigatório");
        }

        // Validação - name
        if (!this.name || this.name.trim() === "") {
            throw new Error("O nome do hotel é obrigatório");
        }

        // Validação - address
        if (!this.address || this.address.trim() === "") {
            throw new Error("O endereço do hotel é obrigatório");
        }
        
        // Validação - latitude
        if (typeof this.latitude !== "number" || Number.isNaN(this.latitude)) {
            throw new Error("A latitude é obrigatória e deve ser um número");
        }
        if (this.latitude < -90 || this.latitude > 90) {
            throw new Error("O valor mínimo da latitude é de -90 e o máximo é de 90");
        }

        // Validação - longitude
        if (typeof this.longitude !== "number" || Number.isNaN(this.longitude)) {
            throw new Error("A longitude é obrigatória e deve ser um número");
        }
        if (this.longitude < -180 || this.longitude > 180) {
            throw new Error("O valor mínimo da longitude é de -180 e o máximo é de 180");
        }
    }
}