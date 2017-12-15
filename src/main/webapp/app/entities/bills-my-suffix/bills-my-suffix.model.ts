import { BaseEntity } from './../../shared';

export const enum BillType {
    'WATER',
    'ELECTRICITY',
    'OTHER_BILLS'
}

export class BillsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public billAmount?: number,
        public billdate?: any,
        public billType?: BillType,
        public billImageContentType?: string,
        public billImage?: any,
        public filedById?: number,
    ) {
    }
}
