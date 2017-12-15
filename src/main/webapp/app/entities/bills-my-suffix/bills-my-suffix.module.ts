import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelSharedModule } from '../../shared';
import {
    BillsMySuffixService,
    BillsMySuffixPopupService,
    BillsMySuffixComponent,
    BillsMySuffixDetailComponent,
    BillsMySuffixDialogComponent,
    BillsMySuffixPopupComponent,
    BillsMySuffixDeletePopupComponent,
    BillsMySuffixDeleteDialogComponent,
    billsRoute,
    billsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...billsRoute,
    ...billsPopupRoute,
];

@NgModule({
    imports: [
        HotelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillsMySuffixComponent,
        BillsMySuffixDetailComponent,
        BillsMySuffixDialogComponent,
        BillsMySuffixDeleteDialogComponent,
        BillsMySuffixPopupComponent,
        BillsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        BillsMySuffixComponent,
        BillsMySuffixDialogComponent,
        BillsMySuffixPopupComponent,
        BillsMySuffixDeleteDialogComponent,
        BillsMySuffixDeletePopupComponent,
    ],
    providers: [
        BillsMySuffixService,
        BillsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelBillsMySuffixModule {}
