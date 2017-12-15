/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { PettyCashMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix-delete-dialog.component';
import { PettyCashMySuffixService } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix.service';

describe('Component Tests', () => {

    describe('PettyCashMySuffix Management Delete Component', () => {
        let comp: PettyCashMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PettyCashMySuffixDeleteDialogComponent>;
        let service: PettyCashMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [PettyCashMySuffixDeleteDialogComponent],
                providers: [
                    PettyCashMySuffixService
                ]
            })
            .overrideTemplate(PettyCashMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PettyCashMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PettyCashMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
