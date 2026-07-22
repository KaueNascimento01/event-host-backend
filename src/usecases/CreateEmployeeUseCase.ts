import { EmployeeGateway } from "../domain/gateway/EmployeeGateway";
import { Employee } from "../domain/entity/Employee";

export interface EmployeeInput{
    name: string;
    email: string;
    position: string;
}

export class CreateEmployeeUseCase{
    constructor(
        private readonly employeeGateway : EmployeeGateway,
    ) {}

    async execute(input: EmployeeInput): Promise<Employee>{
        const employeeEmail = await this.employeeGateway.findByEmail(input.email);
        if(employeeEmail !== null){
            throw new Error("Já existe um funcionário registrado com o e-mail informado");
        }

        const employee = new Employee(
            crypto.randomUUID(),
            input.name,
            input.email,
            input.position
        );

        await this.employeeGateway.save(employee);

        return employee;
    }
}