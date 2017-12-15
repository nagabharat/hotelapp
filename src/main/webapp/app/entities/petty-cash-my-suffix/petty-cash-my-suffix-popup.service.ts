import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PettyCashMySuffix } from './petty-cash-my-suffix.model';
import { PettyCashMySuffixService } from './petty-cash-my-suffix.service';

@Injectable()
export class PettyCashMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pettyCashService: PettyCashMySuffixService

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
                this.pettyCashService.find(id).subscribe((pettyCash) => {
                    if (pettyCash.billdate) {
                        pettyCash.billdate = {
                            year: pettyCash.billdate.getFullYear(),
                            month: pettyCash.billdate.getMonth() + 1,
                            day: pettyCash.billdate.getDate()
                        };
                    }
                    this.ngbModalRef = this.pettyCashModalRef(component, pettyCash);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pettyCashModalRef(component, new PettyCashMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pettyCashModalRef(component: Component, pettyCash: PettyCashMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pettyCash = pettyCash;
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
