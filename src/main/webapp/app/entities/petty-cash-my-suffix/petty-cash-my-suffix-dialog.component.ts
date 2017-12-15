import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PettyCashMySuffix } from './petty-cash-my-suffix.model';
import { PettyCashMySuffixPopupService } from './petty-cash-my-suffix-popup.service';
import { PettyCashMySuffixService } from './petty-cash-my-suffix.service';
import { EmployeeMySuffix, EmployeeMySuffixService } from '../employee-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-petty-cash-my-suffix-dialog',
    templateUrl: './petty-cash-my-suffix-dialog.component.html'
})
export class PettyCashMySuffixDialogComponent implements OnInit {

    pettyCash: PettyCashMySuffix;
    isSaving: boolean;

    employees: EmployeeMySuffix[];
    billdateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pettyCashService: PettyCashMySuffixService,
        private employeeService: EmployeeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeeService.query()
            .subscribe((res: ResponseWrapper) => { this.employees = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pettyCash.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pettyCashService.update(this.pettyCash));
        } else {
            this.subscribeToSaveResponse(
                this.pettyCashService.create(this.pettyCash));
        }
    }

    private subscribeToSaveResponse(result: Observable<PettyCashMySuffix>) {
        result.subscribe((res: PettyCashMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PettyCashMySuffix) {
        this.eventManager.broadcast({ name: 'pettyCashListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmployeeById(index: number, item: EmployeeMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-petty-cash-my-suffix-popup',
    template: ''
})
export class PettyCashMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pettyCashPopupService: PettyCashMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pettyCashPopupService
                    .open(PettyCashMySuffixDialogComponent as Component, params['id']);
            } else {
                this.pettyCashPopupService
                    .open(PettyCashMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
