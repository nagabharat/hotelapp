import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SalaryComponentMySuffix } from './salary-component-my-suffix.model';
import { SalaryComponentMySuffixPopupService } from './salary-component-my-suffix-popup.service';
import { SalaryComponentMySuffixService } from './salary-component-my-suffix.service';

@Component({
    selector: 'jhi-salary-component-my-suffix-dialog',
    templateUrl: './salary-component-my-suffix-dialog.component.html'
})
export class SalaryComponentMySuffixDialogComponent implements OnInit {

    salaryComponent: SalaryComponentMySuffix;
    isSaving: boolean;
    dateOfJoiningDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private salaryComponentService: SalaryComponentMySuffixService,
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
        if (this.salaryComponent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salaryComponentService.update(this.salaryComponent));
        } else {
            this.subscribeToSaveResponse(
                this.salaryComponentService.create(this.salaryComponent));
        }
    }

    private subscribeToSaveResponse(result: Observable<SalaryComponentMySuffix>) {
        result.subscribe((res: SalaryComponentMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SalaryComponentMySuffix) {
        this.eventManager.broadcast({ name: 'salaryComponentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-salary-component-my-suffix-popup',
    template: ''
})
export class SalaryComponentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salaryComponentPopupService: SalaryComponentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.salaryComponentPopupService
                    .open(SalaryComponentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.salaryComponentPopupService
                    .open(SalaryComponentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
