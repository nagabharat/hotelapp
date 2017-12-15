import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BookingMySuffixComponent } from './booking-my-suffix.component';
import { BookingMySuffixDetailComponent } from './booking-my-suffix-detail.component';
import { BookingMySuffixPopupComponent } from './booking-my-suffix-dialog.component';
import { BookingMySuffixDeletePopupComponent } from './booking-my-suffix-delete-dialog.component';

export const bookingRoute: Routes = [
    {
        path: 'booking-my-suffix',
        component: BookingMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'booking-my-suffix/:id',
        component: BookingMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookingPopupRoute: Routes = [
    {
        path: 'booking-my-suffix-new',
        component: BookingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'booking-my-suffix/:id/edit',
        component: BookingMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'booking-my-suffix/:id/delete',
        component: BookingMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
