import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmployeeSalaryMySuffix } from './employee-salary-my-suffix.model';
import { EmployeeSalaryMySuffixPopupService } from './employee-salary-my-suffix-popup.service';
import { EmployeeSalaryMySuffixService } from './employee-salary-my-suffix.service';
import { MonthOfYearMySuffix, MonthOfYearMySuffixService } from '../month-of-year-my-suffix';
import { EmployeeMySuffix, EmployeeMySuffixService } from '../employee-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-employee-salary-my-suffix-dialog',
    templateUrl: './employee-salary-my-suffix-dialog.component.html'
})
export class EmployeeSalaryMySuffixDialogComponent implements OnInit {

    employeeSalary: EmployeeSalaryMySuffix;
    isSaving: boolean;

    changedmonths: MonthOfYearMySuffix[];

    employees: EmployeeMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private employeeSalaryService: EmployeeSalaryMySuffixService,
        private monthOfYearService: MonthOfYearMySuffixService,
        private employeeService: EmployeeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.monthOfYearService
            .query({filter: 'employeesalary-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employeeSalary.changedMonthId) {
                    this.changedmonths = res.json;
                } else {
                    this.monthOfYearService
                        .find(this.employeeSalary.changedMonthId)
                        .subscribe((subRes: MonthOfYearMySuffix) => {
                            this.changedmonths = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.employeeService.query()
            .subscribe((res: ResponseWrapper) => { this.employees = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.employeeSalary.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeeSalaryService.update(this.employeeSalary));
        } else {
            this.subscribeToSaveResponse(
                this.employeeSalaryService.create(this.employeeSalary));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmployeeSalaryMySuffix>) {
        result.subscribe((res: EmployeeSalaryMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmployeeSalaryMySuffix) {
        this.eventManager.broadcast({ name: 'employeeSalaryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMonthOfYearById(index: number, item: MonthOfYearMySuffix) {
        return item.id;
    }

    trackEmployeeById(index: number, item: EmployeeMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-employee-salary-my-suffix-popup',
    template: ''
})
export class EmployeeSalaryMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeeSalaryPopupService: EmployeeSalaryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.employeeSalaryPopupService
                    .open(EmployeeSalaryMySuffixDialogComponent as Component, params['id']);
            } else {
                this.employeeSalaryPopupService
                    .open(EmployeeSalaryMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
