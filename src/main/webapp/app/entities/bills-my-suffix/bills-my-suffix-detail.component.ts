import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { BillsMySuffix } from './bills-my-suffix.model';
import { BillsMySuffixService } from './bills-my-suffix.service';

@Component({
    selector: 'jhi-bills-my-suffix-detail',
    templateUrl: './bills-my-suffix-detail.component.html'
})
export class BillsMySuffixDetailComponent implements OnInit, OnDestroy {

    bills: BillsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private billsService: BillsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBills();
    }

    load(id) {
        this.billsService.find(id).subscribe((bills) => {
            this.bills = bills;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'billsListModification',
            (response) => this.load(this.bills.id)
        );
    }
}
