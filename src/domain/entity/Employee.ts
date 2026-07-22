export class Employee {
    constructor (
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly position: string,
    ) {
        this.validate();
    }

    private validate(): void {
        // Validação - name
        if (!this.name || this.name.trim() === "") {
            throw new Error("O nome do funcionário é obrigatório");
        }
        if (this.name.trim().length < 3) {
            throw new Error("O nome deve ter pelo menos 3 caracteres");
        }

        // Validação - email
        if (!this.email || this.email.trim() === "") {
            throw new Error("O e-mail é obrigatório");
        }
        if (!this.email.includes('@')) {
            throw new Error("O '@' no e-mail é obrigatório");
        }
        
        // Validação - position
        if (!this.position || this.position.trim() === "") {
            throw new Error("O cargo é obrigatório");
        }
        if (this.position.trim().length < 2) {
            throw new Error("O cargo deve ter pelo menos 2 caracteres.");
        }
    }
}