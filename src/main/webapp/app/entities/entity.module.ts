import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HotelRoomMySuffixModule } from './room-my-suffix/room-my-suffix.module';
import { HotelBillsMySuffixModule } from './bills-my-suffix/bills-my-suffix.module';
import { HotelPettyCashMySuffixModule } from './petty-cash-my-suffix/petty-cash-my-suffix.module';
import { HotelEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { HotelMonthOfYearMySuffixModule } from './month-of-year-my-suffix/month-of-year-my-suffix.module';
import { HotelEmployeeSalaryMySuffixModule } from './employee-salary-my-suffix/employee-salary-my-suffix.module';
import { HotelSalaryComponentMySuffixModule } from './salary-component-my-suffix/salary-component-my-suffix.module';
import { HotelEmployeeSalarySlipMySuffixModule } from './employee-salary-slip-my-suffix/employee-salary-slip-my-suffix.module';
import { HotelCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { HotelBookingMySuffixModule } from './booking-my-suffix/booking-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HotelRoomMySuffixModule,
        HotelBillsMySuffixModule,
        HotelPettyCashMySuffixModule,
        HotelEmployeeMySuffixModule,
        HotelMonthOfYearMySuffixModule,
        HotelEmployeeSalaryMySuffixModule,
        HotelSalaryComponentMySuffixModule,
        HotelEmployeeSalarySlipMySuffixModule,
        HotelCustomerMySuffixModule,
        HotelBookingMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelEntityModule {}
