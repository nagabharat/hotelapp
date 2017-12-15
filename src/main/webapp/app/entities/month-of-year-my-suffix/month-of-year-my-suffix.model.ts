import { BaseEntity } from './../../shared';

export class MonthOfYearMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public year?: number,
        public month?: number,
    ) {
    }
}
