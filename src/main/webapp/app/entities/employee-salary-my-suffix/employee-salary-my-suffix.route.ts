import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeeSalaryMySuffixComponent } from './employee-salary-my-suffix.component';
import { EmployeeSalaryMySuffixDetailComponent } from './employee-salary-my-suffix-detail.component';
import { EmployeeSalaryMySuffixPopupComponent } from './employee-salary-my-suffix-dialog.component';
import { EmployeeSalaryMySuffixDeletePopupComponent } from './employee-salary-my-suffix-delete-dialog.component';

export const employeeSalaryRoute: Routes = [
    {
        path: 'employee-salary-my-suffix',
        component: EmployeeSalaryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employee-salary-my-suffix/:id',
        component: EmployeeSalaryMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeeSalaryPopupRoute: Routes = [
    {
        path: 'employee-salary-my-suffix-new',
        component: EmployeeSalaryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-salary-my-suffix/:id/edit',
        component: EmployeeSalaryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-salary-my-suffix/:id/delete',
        component: EmployeeSalaryMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.employeeSalary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
