import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeeSalaryMySuffix } from './employee-salary-my-suffix.model';
import { EmployeeSalaryMySuffixPopupService } from './employee-salary-my-suffix-popup.service';
import { EmployeeSalaryMySuffixService } from './employee-salary-my-suffix.service';

@Component({
    selector: 'jhi-employee-salary-my-suffix-delete-dialog',
    templateUrl: './employee-salary-my-suffix-delete-dialog.component.html'
})
export class EmployeeSalaryMySuffixDeleteDialogComponent {

    employeeSalary: EmployeeSalaryMySuffix;

    constructor(
        private employeeSalaryService: EmployeeSalaryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeeSalaryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employeeSalaryListModification',
                content: 'Deleted an employeeSalary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employee-salary-my-suffix-delete-popup',
    template: ''
})
export class EmployeeSalaryMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeeSalaryPopupService: EmployeeSalaryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.employeeSalaryPopupService
                .open(EmployeeSalaryMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
