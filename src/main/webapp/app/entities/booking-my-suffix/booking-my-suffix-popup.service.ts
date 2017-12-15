import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BookingMySuffix } from './booking-my-suffix.model';
import { BookingMySuffixService } from './booking-my-suffix.service';

@Injectable()
export class BookingMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private bookingService: BookingMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.bookingService.find(id).subscribe((booking) => {
                    if (booking.date) {
                        booking.date = {
                            year: booking.date.getFullYear(),
                            month: booking.date.getMonth() + 1,
                            day: booking.date.getDate()
                        };
                    }
                    if (booking.startDate) {
                        booking.startDate = {
                            year: booking.startDate.getFullYear(),
                            month: booking.startDate.getMonth() + 1,
                            day: booking.startDate.getDate()
                        };
                    }
                    if (booking.endDate) {
                        booking.endDate = {
                            year: booking.endDate.getFullYear(),
                            month: booking.endDate.getMonth() + 1,
                            day: booking.endDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.bookingModalRef(component, booking);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bookingModalRef(component, new BookingMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bookingModalRef(component: Component, booking: BookingMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.booking = booking;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
