/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { MonthOfYearMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix-dialog.component';
import { MonthOfYearMySuffixService } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix.service';
import { MonthOfYearMySuffix } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix.model';

describe('Component Tests', () => {

    describe('MonthOfYearMySuffix Management Dialog Component', () => {
        let comp: MonthOfYearMySuffixDialogComponent;
        let fixture: ComponentFixture<MonthOfYearMySuffixDialogComponent>;
        let service: MonthOfYearMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [MonthOfYearMySuffixDialogComponent],
                providers: [
                    MonthOfYearMySuffixService
                ]
            })
            .overrideTemplate(MonthOfYearMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MonthOfYearMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MonthOfYearMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MonthOfYearMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.monthOfYear = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'monthOfYearListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MonthOfYearMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.monthOfYear = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'monthOfYearListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
