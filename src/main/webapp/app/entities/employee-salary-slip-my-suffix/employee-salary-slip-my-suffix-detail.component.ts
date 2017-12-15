import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeeSalarySlipMySuffix } from './employee-salary-slip-my-suffix.model';
import { EmployeeSalarySlipMySuffixService } from './employee-salary-slip-my-suffix.service';

@Component({
    selector: 'jhi-employee-salary-slip-my-suffix-detail',
    templateUrl: './employee-salary-slip-my-suffix-detail.component.html'
})
export class EmployeeSalarySlipMySuffixDetailComponent implements OnInit, OnDestroy {

    employeeSalarySlip: EmployeeSalarySlipMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private employeeSalarySlipService: EmployeeSalarySlipMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmployeeSalarySlips();
    }

    load(id) {
        this.employeeSalarySlipService.find(id).subscribe((employeeSalarySlip) => {
            this.employeeSalarySlip = employeeSalarySlip;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployeeSalarySlips() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeeSalarySlipListModification',
            (response) => this.load(this.employeeSalarySlip.id)
        );
    }
}
