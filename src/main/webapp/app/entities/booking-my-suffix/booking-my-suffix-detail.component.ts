import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BookingMySuffix } from './booking-my-suffix.model';
import { BookingMySuffixService } from './booking-my-suffix.service';

@Component({
    selector: 'jhi-booking-my-suffix-detail',
    templateUrl: './booking-my-suffix-detail.component.html'
})
export class BookingMySuffixDetailComponent implements OnInit, OnDestroy {

    booking: BookingMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bookingService: BookingMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBookings();
    }

    load(id) {
        this.bookingService.find(id).subscribe((booking) => {
            this.booking = booking;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBookings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bookingListModification',
            (response) => this.load(this.booking.id)
        );
    }
}
