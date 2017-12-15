import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { SalaryComponentMySuffix } from './salary-component-my-suffix.model';
import { SalaryComponentMySuffixService } from './salary-component-my-suffix.service';

@Component({
    selector: 'jhi-salary-component-my-suffix-detail',
    templateUrl: './salary-component-my-suffix-detail.component.html'
})
export class SalaryComponentMySuffixDetailComponent implements OnInit, OnDestroy {

    salaryComponent: SalaryComponentMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private salaryComponentService: SalaryComponentMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSalaryComponents();
    }

    load(id) {
        this.salaryComponentService.find(id).subscribe((salaryComponent) => {
            this.salaryComponent = salaryComponent;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSalaryComponents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'salaryComponentListModification',
            (response) => this.load(this.salaryComponent.id)
        );
    }
}
