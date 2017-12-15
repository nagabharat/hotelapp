/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { SalaryComponentMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix-dialog.component';
import { SalaryComponentMySuffixService } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix.service';
import { SalaryComponentMySuffix } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix.model';

describe('Component Tests', () => {

    describe('SalaryComponentMySuffix Management Dialog Component', () => {
        let comp: SalaryComponentMySuffixDialogComponent;
        let fixture: ComponentFixture<SalaryComponentMySuffixDialogComponent>;
        let service: SalaryComponentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [SalaryComponentMySuffixDialogComponent],
                providers: [
                    SalaryComponentMySuffixService
                ]
            })
            .overrideTemplate(SalaryComponentMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalaryComponentMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalaryComponentMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SalaryComponentMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.salaryComponent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'salaryComponentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SalaryComponentMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.salaryComponent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'salaryComponentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
