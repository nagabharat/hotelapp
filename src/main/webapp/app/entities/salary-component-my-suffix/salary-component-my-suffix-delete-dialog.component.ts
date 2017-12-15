import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SalaryComponentMySuffix } from './salary-component-my-suffix.model';
import { SalaryComponentMySuffixPopupService } from './salary-component-my-suffix-popup.service';
import { SalaryComponentMySuffixService } from './salary-component-my-suffix.service';

@Component({
    selector: 'jhi-salary-component-my-suffix-delete-dialog',
    templateUrl: './salary-component-my-suffix-delete-dialog.component.html'
})
export class SalaryComponentMySuffixDeleteDialogComponent {

    salaryComponent: SalaryComponentMySuffix;

    constructor(
        private salaryComponentService: SalaryComponentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salaryComponentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'salaryComponentListModification',
                content: 'Deleted an salaryComponent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-salary-component-my-suffix-delete-popup',
    template: ''
})
export class SalaryComponentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salaryComponentPopupService: SalaryComponentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.salaryComponentPopupService
                .open(SalaryComponentMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
