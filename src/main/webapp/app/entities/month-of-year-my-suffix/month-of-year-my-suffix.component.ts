import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MonthOfYearMySuffix } from './month-of-year-my-suffix.model';
import { MonthOfYearMySuffixService } from './month-of-year-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-month-of-year-my-suffix',
    templateUrl: './month-of-year-my-suffix.component.html'
})
export class MonthOfYearMySuffixComponent implements OnInit, OnDestroy {
monthOfYears: MonthOfYearMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private monthOfYearService: MonthOfYearMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.monthOfYearService.query().subscribe(
            (res: ResponseWrapper) => {
                this.monthOfYears = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMonthOfYears();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MonthOfYearMySuffix) {
        return item.id;
    }
    registerChangeInMonthOfYears() {
        this.eventSubscriber = this.eventManager.subscribe('monthOfYearListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
