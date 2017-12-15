import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeeSalarySlipMySuffixComponent } from './employee-salary-slip-my-suffix.component';
import { EmployeeSalarySlipMySuffixDetailComponent } from './employee-salary-slip-my-suffix-detail.component';
import { EmployeeSalarySlipMySuffixPopupComponent } from './employee-salary-slip-my-suffix-dialog.component';
import { EmployeeSalarySlipMySuffixDeletePopupComponent } from './employee-salary-slip-my-suffix-delete-dialog.component';

export const employeeSalarySlipRoute: Routes = [
    {
        path: 'employee-salary-slip-my-suffix',
        component: EmployeeSalarySlipMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalarySlip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employee-salary-slip-my-suffix/:id',
        component: EmployeeSalarySlipMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalarySlip.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeeSalarySlipPopupRoute: Routes = [
    {
        path: 'employee-salary-slip-my-suffix-new',
        component: EmployeeSalarySlipMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalarySlip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-salary-slip-my-suffix/:id/edit',
        component: EmployeeSalarySlipMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalarySlip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-salary-slip-my-suffix/:id/delete',
        component: EmployeeSalarySlipMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalarySlip.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
