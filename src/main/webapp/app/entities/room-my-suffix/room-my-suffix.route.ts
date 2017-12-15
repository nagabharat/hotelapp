import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoomMySuffixComponent } from './room-my-suffix.component';
import { RoomMySuffixDetailComponent } from './room-my-suffix-detail.component';
import { RoomMySuffixPopupComponent } from './room-my-suffix-dialog.component';
import { RoomMySuffixDeletePopupComponent } from './room-my-suffix-delete-dialog.component';

export const roomRoute: Routes = [
    {
        path: 'room-my-suffix',
        component: RoomMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.room.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room-my-suffix/:id',
        component: RoomMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.room.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomPopupRoute: Routes = [
    {
        path: 'room-my-suffix-new',
        component: RoomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-my-suffix/:id/edit',
        component: RoomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-my-suffix/:id/delete',
        component: RoomMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hotelApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
