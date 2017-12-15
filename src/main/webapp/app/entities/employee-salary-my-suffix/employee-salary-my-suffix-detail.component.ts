import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeeSalaryMySuffix } from './employee-salary-my-suffix.model';
import { EmployeeSalaryMySuffixService } from './employee-salary-my-suffix.service';

@Component({
    selector: 'jhi-employee-salary-my-suffix-detail',
    templateUrl: './employee-salary-my-suffix-detail.component.html'
})
export class EmployeeSalaryMySuffixDetailComponent implements OnInit, OnDestroy {

    employeeSalary: EmployeeSalaryMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private employeeSalaryService: EmployeeSalaryMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmployeeSalaries();
    }

    load(id) {
        this.employeeSalaryService.find(id).subscribe((employeeSalary) => {
            this.employeeSalary = employeeSalary;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployeeSalaries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeeSalaryListModification',
            (response) => this.load(this.employeeSalary.id)
        );
    }
}
