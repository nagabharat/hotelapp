import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PettyCashMySuffix } from './petty-cash-my-suffix.model';
import { PettyCashMySuffixService } from './petty-cash-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-petty-cash-my-suffix',
    templateUrl: './petty-cash-my-suffix.component.html'
})
export class PettyCashMySuffixComponent implements OnInit, OnDestroy {
pettyCashes: PettyCashMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pettyCashService: PettyCashMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pettyCashService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pettyCashes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPettyCashes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PettyCashMySuffix) {
        return item.id;
    }
    registerChangeInPettyCashes() {
        this.eventSubscriber = this.eventManager.subscribe('pettyCashListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
