import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelSharedModule } from '../../shared';
import {
    PettyCashMySuffixService,
    PettyCashMySuffixPopupService,
    PettyCashMySuffixComponent,
    PettyCashMySuffixDetailComponent,
    PettyCashMySuffixDialogComponent,
    PettyCashMySuffixPopupComponent,
    PettyCashMySuffixDeletePopupComponent,
    PettyCashMySuffixDeleteDialogComponent,
    pettyCashRoute,
    pettyCashPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pettyCashRoute,
    ...pettyCashPopupRoute,
];

@NgModule({
    imports: [
        HotelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PettyCashMySuffixComponent,
        PettyCashMySuffixDetailComponent,
        PettyCashMySuffixDialogComponent,
        PettyCashMySuffixDeleteDialogComponent,
        PettyCashMySuffixPopupComponent,
        PettyCashMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PettyCashMySuffixComponent,
        PettyCashMySuffixDialogComponent,
        PettyCashMySuffixPopupComponent,
        PettyCashMySuffixDeleteDialogComponent,
        PettyCashMySuffixDeletePopupComponent,
    ],
    providers: [
        PettyCashMySuffixService,
        PettyCashMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelPettyCashMySuffixModule {}
