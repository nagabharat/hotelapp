import { BaseEntity } from './../../shared';

export const enum RoomType {
    'AC',
    'NON_AC'
}

export class RoomMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public roomName?: string,
        public roomType?: RoomType,
        public bookingId?: number,
    ) {
    }
}
