import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoomMySuffix } from './room-my-suffix.model';
import { RoomMySuffixPopupService } from './room-my-suffix-popup.service';
import { RoomMySuffixService } from './room-my-suffix.service';

@Component({
    selector: 'jhi-room-my-suffix-delete-dialog',
    templateUrl: './room-my-suffix-delete-dialog.component.html'
})
export class RoomMySuffixDeleteDialogComponent {

    room: RoomMySuffix;

    constructor(
        private roomService: RoomMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roomListModification',
                content: 'Deleted an room'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-room-my-suffix-delete-popup',
    template: ''
})
export class RoomMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roomPopupService
                .open(RoomMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
