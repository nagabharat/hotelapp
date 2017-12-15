import { BaseEntity } from './../../shared';

export class EmployeeSalaryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public gross?: number,
        public changedMonthId?: number,
        public employeeId?: number,
    ) {
    }
}
