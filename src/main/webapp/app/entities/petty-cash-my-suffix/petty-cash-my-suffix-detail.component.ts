import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PettyCashMySuffix } from './petty-cash-my-suffix.model';
import { PettyCashMySuffixService } from './petty-cash-my-suffix.service';

@Component({
    selector: 'jhi-petty-cash-my-suffix-detail',
    templateUrl: './petty-cash-my-suffix-detail.component.html'
})
export class PettyCashMySuffixDetailComponent implements OnInit, OnDestroy {

    pettyCash: PettyCashMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pettyCashService: PettyCashMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPettyCashes();
    }

    load(id) {
        this.pettyCashService.find(id).subscribe((pettyCash) => {
            this.pettyCash = pettyCash;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPettyCashes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pettyCashListModification',
            (response) => this.load(this.pettyCash.id)
        );
    }
}
