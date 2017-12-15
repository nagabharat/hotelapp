import { BaseEntity } from './../../shared';

export class EmployeeSalarySlipMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public gross?: number,
        public monthId?: number,
        public employeeId?: number,
    ) {
    }
}
