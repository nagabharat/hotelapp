import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PettyCashMySuffixComponent } from './petty-cash-my-suffix.component';
import { PettyCashMySuffixDetailComponent } from './petty-cash-my-suffix-detail.component';
import { PettyCashMySuffixPopupComponent } from './petty-cash-my-suffix-dialog.component';
import { PettyCashMySuffixDeletePopupComponent } from './petty-cash-my-suffix-delete-dialog.component';

export const pettyCashRoute: Routes = [
    {
        path: 'petty-cash-my-suffix',
        component: PettyCashMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'petty-cash-my-suffix/:id',
        component: PettyCashMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pettyCashPopupRoute: Routes = [
    {
        path: 'petty-cash-my-suffix-new',
        component: PettyCashMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'petty-cash-my-suffix/:id/edit',
        component: PettyCashMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'petty-cash-my-suffix/:id/delete',
        component: PettyCashMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
