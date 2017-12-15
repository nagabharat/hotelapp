/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { BillsMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix-dialog.component';
import { BillsMySuffixService } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix.service';
import { BillsMySuffix } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix.model';
import { EmployeeMySuffixService } from '../../../../../../main/webapp/app/entities/employee-my-suffix';

describe('Component Tests', () => {

    describe('BillsMySuffix Management Dialog Component', () => {
        let comp: BillsMySuffixDialogComponent;
        let fixture: ComponentFixture<BillsMySuffixDialogComponent>;
        let service: BillsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [BillsMySuffixDialogComponent],
                providers: [
                    EmployeeMySuffixService,
                    BillsMySuffixService
                ]
            })
            .overrideTemplate(BillsMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillsMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillsMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillsMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bills = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BillsMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bills = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'billsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
