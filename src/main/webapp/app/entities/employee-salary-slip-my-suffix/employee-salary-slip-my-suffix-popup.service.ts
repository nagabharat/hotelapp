import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeSalarySlipMySuffix } from './employee-salary-slip-my-suffix.model';
import { EmployeeSalarySlipMySuffixService } from './employee-salary-slip-my-suffix.service';

@Injectable()
export class EmployeeSalarySlipMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private employeeSalarySlipService: EmployeeSalarySlipMySuffixService

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
                this.employeeSalarySlipService.find(id).subscribe((employeeSalarySlip) => {
                    this.ngbModalRef = this.employeeSalarySlipModalRef(component, employeeSalarySlip);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeeSalarySlipModalRef(component, new EmployeeSalarySlipMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    employeeSalarySlipModalRef(component: Component, employeeSalarySlip: EmployeeSalarySlipMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employeeSalarySlip = employeeSalarySlip;
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
