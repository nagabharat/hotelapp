/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { PettyCashMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix-dialog.component';
import { PettyCashMySuffixService } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix.service';
import { PettyCashMySuffix } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix.model';
import { EmployeeMySuffixService } from '../../../../../../main/webapp/app/entities/employee-my-suffix';

describe('Component Tests', () => {

    describe('PettyCashMySuffix Management Dialog Component', () => {
        let comp: PettyCashMySuffixDialogComponent;
        let fixture: ComponentFixture<PettyCashMySuffixDialogComponent>;
        let service: PettyCashMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [PettyCashMySuffixDialogComponent],
                providers: [
                    EmployeeMySuffixService,
                    PettyCashMySuffixService
                ]
            })
            .overrideTemplate(PettyCashMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PettyCashMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PettyCashMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PettyCashMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.pettyCash = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pettyCashListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PettyCashMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.pettyCash = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pettyCashListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
