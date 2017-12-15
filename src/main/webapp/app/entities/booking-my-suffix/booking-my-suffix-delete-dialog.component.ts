import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BookingMySuffix } from './booking-my-suffix.model';
import { BookingMySuffixPopupService } from './booking-my-suffix-popup.service';
import { BookingMySuffixService } from './booking-my-suffix.service';

@Component({
    selector: 'jhi-booking-my-suffix-delete-dialog',
    templateUrl: './booking-my-suffix-delete-dialog.component.html'
})
export class BookingMySuffixDeleteDialogComponent {

    booking: BookingMySuffix;

    constructor(
        private bookingService: BookingMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bookingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bookingListModification',
                content: 'Deleted an booking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-booking-my-suffix-delete-popup',
    template: ''
})
export class BookingMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookingPopupService: BookingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bookingPopupService
                .open(BookingMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
