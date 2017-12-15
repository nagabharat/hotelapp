import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MonthOfYearMySuffix } from './month-of-year-my-suffix.model';
import { MonthOfYearMySuffixPopupService } from './month-of-year-my-suffix-popup.service';
import { MonthOfYearMySuffixService } from './month-of-year-my-suffix.service';

@Component({
    selector: 'jhi-month-of-year-my-suffix-delete-dialog',
    templateUrl: './month-of-year-my-suffix-delete-dialog.component.html'
})
export class MonthOfYearMySuffixDeleteDialogComponent {

    monthOfYear: MonthOfYearMySuffix;

    constructor(
        private monthOfYearService: MonthOfYearMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.monthOfYearService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'monthOfYearListModification',
                content: 'Deleted an monthOfYear'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-month-of-year-my-suffix-delete-popup',
    template: ''
})
export class MonthOfYearMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private monthOfYearPopupService: MonthOfYearMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.monthOfYearPopupService
                .open(MonthOfYearMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
