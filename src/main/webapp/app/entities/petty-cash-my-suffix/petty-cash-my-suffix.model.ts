import { BaseEntity } from './../../shared';

export const enum PettyCashSetting {
    'TEA',
    'FUEL',
    'OTHER'
}

export class PettyCashMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public pettyCashSettings?: PettyCashSetting,
        public amount?: number,
        public billdate?: any,
        public filedById?: number,
    ) {
    }
}
