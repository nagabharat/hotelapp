import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SalaryComponentMySuffixComponent } from './salary-component-my-suffix.component';
import { SalaryComponentMySuffixDetailComponent } from './salary-component-my-suffix-detail.component';
import { SalaryComponentMySuffixPopupComponent } from './salary-component-my-suffix-dialog.component';
import { SalaryComponentMySuffixDeletePopupComponent } from './salary-component-my-suffix-delete-dialog.component';

export const salaryComponentRoute: Routes = [
    {
        path: 'salary-component-my-suffix',
        component: SalaryComponentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.salaryComponent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'salary-component-my-suffix/:id',
        component: SalaryComponentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.salaryComponent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salaryComponentPopupRoute: Routes = [
    {
        path: 'salary-component-my-suffix-new',
        component: SalaryComponentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.salaryComponent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salary-component-my-suffix/:id/edit',
        component: SalaryComponentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.salaryComponent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salary-component-my-suffix/:id/delete',
        component: SalaryComponentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.salaryComponent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
