import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelSharedModule } from '../../shared';
import {
    SalaryComponentMySuffixService,
    SalaryComponentMySuffixPopupService,
    SalaryComponentMySuffixComponent,
    SalaryComponentMySuffixDetailComponent,
    SalaryComponentMySuffixDialogComponent,
    SalaryComponentMySuffixPopupComponent,
    SalaryComponentMySuffixDeletePopupComponent,
    SalaryComponentMySuffixDeleteDialogComponent,
    salaryComponentRoute,
    salaryComponentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...salaryComponentRoute,
    ...salaryComponentPopupRoute,
];

@NgModule({
    imports: [
        HotelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SalaryComponentMySuffixComponent,
        SalaryComponentMySuffixDetailComponent,
        SalaryComponentMySuffixDialogComponent,
        SalaryComponentMySuffixDeleteDialogComponent,
        SalaryComponentMySuffixPopupComponent,
        SalaryComponentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SalaryComponentMySuffixComponent,
        SalaryComponentMySuffixDialogComponent,
        SalaryComponentMySuffixPopupComponent,
        SalaryComponentMySuffixDeleteDialogComponent,
        SalaryComponentMySuffixDeletePopupComponent,
    ],
    providers: [
        SalaryComponentMySuffixService,
        SalaryComponentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelSalaryComponentMySuffixModule {}
