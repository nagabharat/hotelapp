import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeeSalarySlipMySuffix } from './employee-salary-slip-my-suffix.model';
import { EmployeeSalarySlipMySuffixPopupService } from './employee-salary-slip-my-suffix-popup.service';
import { EmployeeSalarySlipMySuffixService } from './employee-salary-slip-my-suffix.service';

@Component({
    selector: 'jhi-employee-salary-slip-my-suffix-delete-dialog',
    templateUrl: './employee-salary-slip-my-suffix-delete-dialog.component.html'
})
export class EmployeeSalarySlipMySuffixDeleteDialogComponent {

    employeeSalarySlip: EmployeeSalarySlipMySuffix;

    constructor(
        private employeeSalarySlipService: EmployeeSalarySlipMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeeSalarySlipService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employeeSalarySlipListModification',
                content: 'Deleted an employeeSalarySlip'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employee-salary-slip-my-suffix-delete-popup',
    template: ''
})
export class EmployeeSalarySlipMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeeSalarySlipPopupService: EmployeeSalarySlipMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.employeeSalarySlipPopupService
                .open(EmployeeSalarySlipMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
