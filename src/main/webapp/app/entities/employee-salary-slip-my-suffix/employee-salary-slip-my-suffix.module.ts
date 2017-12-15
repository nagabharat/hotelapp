import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelSharedModule } from '../../shared';
import {
    EmployeeSalarySlipMySuffixService,
    EmployeeSalarySlipMySuffixPopupService,
    EmployeeSalarySlipMySuffixComponent,
    EmployeeSalarySlipMySuffixDetailComponent,
    EmployeeSalarySlipMySuffixDialogComponent,
    EmployeeSalarySlipMySuffixPopupComponent,
    EmployeeSalarySlipMySuffixDeletePopupComponent,
    EmployeeSalarySlipMySuffixDeleteDialogComponent,
    employeeSalarySlipRoute,
    employeeSalarySlipPopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeeSalarySlipRoute,
    ...employeeSalarySlipPopupRoute,
];

@NgModule({
    imports: [
        HotelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeeSalarySlipMySuffixComponent,
        EmployeeSalarySlipMySuffixDetailComponent,
        EmployeeSalarySlipMySuffixDialogComponent,
        EmployeeSalarySlipMySuffixDeleteDialogComponent,
        EmployeeSalarySlipMySuffixPopupComponent,
        EmployeeSalarySlipMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EmployeeSalarySlipMySuffixComponent,
        EmployeeSalarySlipMySuffixDialogComponent,
        EmployeeSalarySlipMySuffixPopupComponent,
        EmployeeSalarySlipMySuffixDeleteDialogComponent,
        EmployeeSalarySlipMySuffixDeletePopupComponent,
    ],
    providers: [
        EmployeeSalarySlipMySuffixService,
        EmployeeSalarySlipMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelEmployeeSalarySlipMySuffixModule {}
