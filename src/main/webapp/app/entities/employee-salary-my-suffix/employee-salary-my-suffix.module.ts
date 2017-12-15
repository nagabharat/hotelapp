import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelSharedModule } from '../../shared';
import {
    EmployeeSalaryMySuffixService,
    EmployeeSalaryMySuffixPopupService,
    EmployeeSalaryMySuffixComponent,
    EmployeeSalaryMySuffixDetailComponent,
    EmployeeSalaryMySuffixDialogComponent,
    EmployeeSalaryMySuffixPopupComponent,
    EmployeeSalaryMySuffixDeletePopupComponent,
    EmployeeSalaryMySuffixDeleteDialogComponent,
    employeeSalaryRoute,
    employeeSalaryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeeSalaryRoute,
    ...employeeSalaryPopupRoute,
];

@NgModule({
    imports: [
        HotelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeeSalaryMySuffixComponent,
        EmployeeSalaryMySuffixDetailComponent,
        EmployeeSalaryMySuffixDialogComponent,
        EmployeeSalaryMySuffixDeleteDialogComponent,
        EmployeeSalaryMySuffixPopupComponent,
        EmployeeSalaryMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EmployeeSalaryMySuffixComponent,
        EmployeeSalaryMySuffixDialogComponent,
        EmployeeSalaryMySuffixPopupComponent,
        EmployeeSalaryMySuffixDeleteDialogComponent,
        EmployeeSalaryMySuffixDeletePopupComponent,
    ],
    providers: [
        EmployeeSalaryMySuffixService,
        EmployeeSalaryMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelEmployeeSalaryMySuffixModule {}
