import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MonthOfYearMySuffix } from './month-of-year-my-suffix.model';
import { MonthOfYearMySuffixPopupService } from './month-of-year-my-suffix-popup.service';
import { MonthOfYearMySuffixService } from './month-of-year-my-suffix.service';

@Component({
    selector: 'jhi-month-of-year-my-suffix-dialog',
    templateUrl: './month-of-year-my-suffix-dialog.component.html'
})
export class MonthOfYearMySuffixDialogComponent implements OnInit {

    monthOfYear: MonthOfYearMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private monthOfYearService: MonthOfYearMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.monthOfYear.id !== undefined) {
            this.subscribeToSaveResponse(
                this.monthOfYearService.update(this.monthOfYear));
        } else {
            this.subscribeToSaveResponse(
                this.monthOfYearService.create(this.monthOfYear));
        }
    }

    private subscribeToSaveResponse(result: Observable<MonthOfYearMySuffix>) {
        result.subscribe((res: MonthOfYearMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MonthOfYearMySuffix) {
        this.eventManager.broadcast({ name: 'monthOfYearListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-month-of-year-my-suffix-popup',
    template: ''
})
export class MonthOfYearMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private monthOfYearPopupService: MonthOfYearMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.monthOfYearPopupService
                    .open(MonthOfYearMySuffixDialogComponent as Component, params['id']);
            } else {
                this.monthOfYearPopupService
                    .open(MonthOfYearMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
