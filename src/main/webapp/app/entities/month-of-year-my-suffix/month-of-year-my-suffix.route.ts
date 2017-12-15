import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MonthOfYearMySuffixComponent } from './month-of-year-my-suffix.component';
import { MonthOfYearMySuffixDetailComponent } from './month-of-year-my-suffix-detail.component';
import { MonthOfYearMySuffixPopupComponent } from './month-of-year-my-suffix-dialog.component';
import { MonthOfYearMySuffixDeletePopupComponent } from './month-of-year-my-suffix-delete-dialog.component';

export const monthOfYearRoute: Routes = [
    {
        path: 'month-of-year-my-suffix',
        component: MonthOfYearMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.monthOfYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'month-of-year-my-suffix/:id',
        component: MonthOfYearMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.monthOfYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const monthOfYearPopupRoute: Routes = [
    {
        path: 'month-of-year-my-suffix-new',
        component: MonthOfYearMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.monthOfYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'month-of-year-my-suffix/:id/edit',
        component: MonthOfYearMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.monthOfYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'month-of-year-my-suffix/:id/delete',
        component: MonthOfYearMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.monthOfYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
