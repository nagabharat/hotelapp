import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BillsMySuffixComponent } from './bills-my-suffix.component';
import { BillsMySuffixDetailComponent } from './bills-my-suffix-detail.component';
import { BillsMySuffixPopupComponent } from './bills-my-suffix-dialog.component';
import { BillsMySuffixDeletePopupComponent } from './bills-my-suffix-delete-dialog.component';

export const billsRoute: Routes = [
    {
        path: 'bills-my-suffix',
        component: BillsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.bills.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bills-my-suffix/:id',
        component: BillsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.bills.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billsPopupRoute: Routes = [
    {
        path: 'bills-my-suffix-new',
        component: BillsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.bills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bills-my-suffix/:id/edit',
        component: BillsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.bills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bills-my-suffix/:id/delete',
        component: BillsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.bills.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
