import { Employee } from "../entity/Employee";

export interface EmployeeGateway {
    save(employee: Employee): Promise<void>;
    findById(id: string): Promise<Employee | null>;
    findByEmail(email: string): Promise<Employee | null>;
}