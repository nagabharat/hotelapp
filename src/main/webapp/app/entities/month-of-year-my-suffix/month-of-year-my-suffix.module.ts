import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelSharedModule } from '../../shared';
import {
    MonthOfYearMySuffixService,
    MonthOfYearMySuffixPopupService,
    MonthOfYearMySuffixComponent,
    MonthOfYearMySuffixDetailComponent,
    MonthOfYearMySuffixDialogComponent,
    MonthOfYearMySuffixPopupComponent,
    MonthOfYearMySuffixDeletePopupComponent,
    MonthOfYearMySuffixDeleteDialogComponent,
    monthOfYearRoute,
    monthOfYearPopupRoute,
} from './';

const ENTITY_STATES = [
    ...monthOfYearRoute,
    ...monthOfYearPopupRoute,
];

@NgModule({
    imports: [
        HotelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MonthOfYearMySuffixComponent,
        MonthOfYearMySuffixDetailComponent,
        MonthOfYearMySuffixDialogComponent,
        MonthOfYearMySuffixDeleteDialogComponent,
        MonthOfYearMySuffixPopupComponent,
        MonthOfYearMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MonthOfYearMySuffixComponent,
        MonthOfYearMySuffixDialogComponent,
        MonthOfYearMySuffixPopupComponent,
        MonthOfYearMySuffixDeleteDialogComponent,
        MonthOfYearMySuffixDeletePopupComponent,
    ],
    providers: [
        MonthOfYearMySuffixService,
        MonthOfYearMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelMonthOfYearMySuffixModule {}
