import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SalaryComponentMySuffix } from './salary-component-my-suffix.model';
import { SalaryComponentMySuffixService } from './salary-component-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-salary-component-my-suffix',
    templateUrl: './salary-component-my-suffix.component.html'
})
export class SalaryComponentMySuffixComponent implements OnInit, OnDestroy {
salaryComponents: SalaryComponentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private salaryComponentService: SalaryComponentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.salaryComponentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.salaryComponents = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSalaryComponents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SalaryComponentMySuffix) {
        return item.id;
    }
    registerChangeInSalaryComponents() {
        this.eventSubscriber = this.eventManager.subscribe('salaryComponentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
