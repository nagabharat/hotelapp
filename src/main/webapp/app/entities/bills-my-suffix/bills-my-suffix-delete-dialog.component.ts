import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillsMySuffix } from './bills-my-suffix.model';
import { BillsMySuffixPopupService } from './bills-my-suffix-popup.service';
import { BillsMySuffixService } from './bills-my-suffix.service';

@Component({
    selector: 'jhi-bills-my-suffix-delete-dialog',
    templateUrl: './bills-my-suffix-delete-dialog.component.html'
})
export class BillsMySuffixDeleteDialogComponent {

    bills: BillsMySuffix;

    constructor(
        private billsService: BillsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'billsListModification',
                content: 'Deleted an bills'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bills-my-suffix-delete-popup',
    template: ''
})
export class BillsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billsPopupService: BillsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.billsPopupService
                .open(BillsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
