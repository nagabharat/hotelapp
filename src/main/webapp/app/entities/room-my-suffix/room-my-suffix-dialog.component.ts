import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoomMySuffix } from './room-my-suffix.model';
import { RoomMySuffixPopupService } from './room-my-suffix-popup.service';
import { RoomMySuffixService } from './room-my-suffix.service';
import { BookingMySuffix, BookingMySuffixService } from '../booking-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-room-my-suffix-dialog',
    templateUrl: './room-my-suffix-dialog.component.html'
})
export class RoomMySuffixDialogComponent implements OnInit {

    room: RoomMySuffix;
    isSaving: boolean;

    bookings: BookingMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roomService: RoomMySuffixService,
        private bookingService: BookingMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bookingService.query()
            .subscribe((res: ResponseWrapper) => { this.bookings = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.room.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomService.update(this.room));
        } else {
            this.subscribeToSaveResponse(
                this.roomService.create(this.room));
        }
    }

    private subscribeToSaveResponse(result: Observable<RoomMySuffix>) {
        result.subscribe((res: RoomMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RoomMySuffix) {
        this.eventManager.broadcast({ name: 'roomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBookingById(index: number, item: BookingMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-room-my-suffix-popup',
    template: ''
})
export class RoomMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomPopupService
                    .open(RoomMySuffixDialogComponent as Component, params['id']);
            } else {
                this.roomPopupService
                    .open(RoomMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
