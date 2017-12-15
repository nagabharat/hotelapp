import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { BillsMySuffix } from './bills-my-suffix.model';
import { BillsMySuffixPopupService } from './bills-my-suffix-popup.service';
import { BillsMySuffixService } from './bills-my-suffix.service';
import { EmployeeMySuffix, EmployeeMySuffixService } from '../employee-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bills-my-suffix-dialog',
    templateUrl: './bills-my-suffix-dialog.component.html'
})
export class BillsMySuffixDialogComponent implements OnInit {

    bills: BillsMySuffix;
    isSaving: boolean;

    employees: EmployeeMySuffix[];
    billdateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private billsService: BillsMySuffixService,
        private employeeService: EmployeeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeeService.query()
            .subscribe((res: ResponseWrapper) => { this.employees = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bills.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billsService.update(this.bills));
        } else {
            this.subscribeToSaveResponse(
                this.billsService.create(this.bills));
        }
    }

    private subscribeToSaveResponse(result: Observable<BillsMySuffix>) {
        result.subscribe((res: BillsMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BillsMySuffix) {
        this.eventManager.broadcast({ name: 'billsListModification', content: 'OK'});
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
    selector: 'jhi-bills-my-suffix-popup',
    template: ''
})
export class BillsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billsPopupService: BillsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billsPopupService
                    .open(BillsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.billsPopupService
                    .open(BillsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
