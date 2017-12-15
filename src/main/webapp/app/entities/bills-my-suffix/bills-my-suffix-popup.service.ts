import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BillsMySuffix } from './bills-my-suffix.model';
import { BillsMySuffixService } from './bills-my-suffix.service';

@Injectable()
export class BillsMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private billsService: BillsMySuffixService

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
                this.billsService.find(id).subscribe((bills) => {
                    if (bills.billdate) {
                        bills.billdate = {
                            year: bills.billdate.getFullYear(),
                            month: bills.billdate.getMonth() + 1,
                            day: bills.billdate.getDate()
                        };
                    }
                    this.ngbModalRef = this.billsModalRef(component, bills);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.billsModalRef(component, new BillsMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    billsModalRef(component: Component, bills: BillsMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bills = bills;
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
