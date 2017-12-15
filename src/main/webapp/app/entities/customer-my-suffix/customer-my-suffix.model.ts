import { BaseEntity } from './../../shared';

export class CustomerMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public phoneNumber?: string,
        public address?: string,
    ) {
    }
}
