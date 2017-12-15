import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelSharedModule } from '../../shared';
import {
    BookingMySuffixService,
    BookingMySuffixPopupService,
    BookingMySuffixComponent,
    BookingMySuffixDetailComponent,
    BookingMySuffixDialogComponent,
    BookingMySuffixPopupComponent,
    BookingMySuffixDeletePopupComponent,
    BookingMySuffixDeleteDialogComponent,
    bookingRoute,
    bookingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bookingRoute,
    ...bookingPopupRoute,
];

@NgModule({
    imports: [
        HotelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BookingMySuffixComponent,
        BookingMySuffixDetailComponent,
        BookingMySuffixDialogComponent,
        BookingMySuffixDeleteDialogComponent,
        BookingMySuffixPopupComponent,
        BookingMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        BookingMySuffixComponent,
        BookingMySuffixDialogComponent,
        BookingMySuffixPopupComponent,
        BookingMySuffixDeleteDialogComponent,
        BookingMySuffixDeletePopupComponent,
    ],
    providers: [
        BookingMySuffixService,
        BookingMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelBookingMySuffixModule {}
