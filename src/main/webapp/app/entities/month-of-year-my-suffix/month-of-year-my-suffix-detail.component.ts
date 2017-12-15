import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MonthOfYearMySuffix } from './month-of-year-my-suffix.model';
import { MonthOfYearMySuffixService } from './month-of-year-my-suffix.service';

@Component({
    selector: 'jhi-month-of-year-my-suffix-detail',
    templateUrl: './month-of-year-my-suffix-detail.component.html'
})
export class MonthOfYearMySuffixDetailComponent implements OnInit, OnDestroy {

    monthOfYear: MonthOfYearMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private monthOfYearService: MonthOfYearMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMonthOfYears();
    }

    load(id) {
        this.monthOfYearService.find(id).subscribe((monthOfYear) => {
            this.monthOfYear = monthOfYear;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMonthOfYears() {
        this.eventSubscriber = this.eventManager.subscribe(
            'monthOfYearListModification',
            (response) => this.load(this.monthOfYear.id)
        );
    }
}
