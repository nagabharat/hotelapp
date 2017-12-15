import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PettyCashMySuffix } from './petty-cash-my-suffix.model';
import { PettyCashMySuffixPopupService } from './petty-cash-my-suffix-popup.service';
import { PettyCashMySuffixService } from './petty-cash-my-suffix.service';

@Component({
    selector: 'jhi-petty-cash-my-suffix-delete-dialog',
    templateUrl: './petty-cash-my-suffix-delete-dialog.component.html'
})
export class PettyCashMySuffixDeleteDialogComponent {

    pettyCash: PettyCashMySuffix;

    constructor(
        private pettyCashService: PettyCashMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pettyCashService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pettyCashListModification',
                content: 'Deleted an pettyCash'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-petty-cash-my-suffix-delete-popup',
    template: ''
})
export class PettyCashMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pettyCashPopupService: PettyCashMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pettyCashPopupService
                .open(PettyCashMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
