import { BaseEntity } from './../../shared';

export class SalaryComponentMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public grossPercent?: number,
        public dateOfJoining?: any,
        public deduction?: boolean,
    ) {
        this.deduction = false;
    }
}
