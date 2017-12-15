import { BaseEntity } from './../../shared';

export class EmployeeMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public empNumber?: string,
        public fullName?: string,
        public dateOfJoining?: any,
        public managerId?: number,
    ) {
    }
}
