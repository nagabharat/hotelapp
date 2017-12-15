import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmployeeSalarySlipMySuffix } from './employee-salary-slip-my-suffix.model';
import { EmployeeSalarySlipMySuffixPopupService } from './employee-salary-slip-my-suffix-popup.service';
import { EmployeeSalarySlipMySuffixService } from './employee-salary-slip-my-suffix.service';
import { MonthOfYearMySuffix, MonthOfYearMySuffixService } from '../month-of-year-my-suffix';
import { EmployeeMySuffix, EmployeeMySuffixService } from '../employee-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-employee-salary-slip-my-suffix-dialog',
    templateUrl: './employee-salary-slip-my-suffix-dialog.component.html'
})
export class EmployeeSalarySlipMySuffixDialogComponent implements OnInit {

    employeeSalarySlip: EmployeeSalarySlipMySuffix;
    isSaving: boolean;

    months: MonthOfYearMySuffix[];

    employees: EmployeeMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private employeeSalarySlipService: EmployeeSalarySlipMySuffixService,
        private monthOfYearService: MonthOfYearMySuffixService,
        private employeeService: EmployeeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.monthOfYearService
            .query({filter: 'employeesalaryslip-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.employeeSalarySlip.monthId) {
                    this.months = res.json;
                } else {
                    this.monthOfYearService
                        .find(this.employeeSalarySlip.monthId)
                        .subscribe((subRes: MonthOfYearMySuffix) => {
                            this.months = [subRes].concat(res.json);
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
        if (this.employeeSalarySlip.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeeSalarySlipService.update(this.employeeSalarySlip));
        } else {
            this.subscribeToSaveResponse(
                this.employeeSalarySlipService.create(this.employeeSalarySlip));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmployeeSalarySlipMySuffix>) {
        result.subscribe((res: EmployeeSalarySlipMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmployeeSalarySlipMySuffix) {
        this.eventManager.broadcast({ name: 'employeeSalarySlipListModification', content: 'OK'});
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
    selector: 'jhi-employee-salary-slip-my-suffix-popup',
    template: ''
})
export class EmployeeSalarySlipMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeeSalarySlipPopupService: EmployeeSalarySlipMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.employeeSalarySlipPopupService
                    .open(EmployeeSalarySlipMySuffixDialogComponent as Component, params['id']);
            } else {
                this.employeeSalarySlipPopupService
                    .open(EmployeeSalarySlipMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
