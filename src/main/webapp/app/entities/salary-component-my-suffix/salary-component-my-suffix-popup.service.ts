import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SalaryComponentMySuffix } from './salary-component-my-suffix.model';
import { SalaryComponentMySuffixService } from './salary-component-my-suffix.service';

@Injectable()
export class SalaryComponentMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private salaryComponentService: SalaryComponentMySuffixService

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
                this.salaryComponentService.find(id).subscribe((salaryComponent) => {
                    if (salaryComponent.dateOfJoining) {
                        salaryComponent.dateOfJoining = {
                            year: salaryComponent.dateOfJoining.getFullYear(),
                            month: salaryComponent.dateOfJoining.getMonth() + 1,
                            day: salaryComponent.dateOfJoining.getDate()
                        };
                    }
                    this.ngbModalRef = this.salaryComponentModalRef(component, salaryComponent);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.salaryComponentModalRef(component, new SalaryComponentMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    salaryComponentModalRef(component: Component, salaryComponent: SalaryComponentMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.salaryComponent = salaryComponent;
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
