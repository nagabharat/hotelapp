/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { EmployeeSalaryMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix-dialog.component';
import { EmployeeSalaryMySuffixService } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix.service';
import { EmployeeSalaryMySuffix } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix.model';
import { MonthOfYearMySuffixService } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix';
import { EmployeeMySuffixService } from '../../../../../../main/webapp/app/entities/employee-my-suffix';

describe('Component Tests', () => {

    describe('EmployeeSalaryMySuffix Management Dialog Component', () => {
        let comp: EmployeeSalaryMySuffixDialogComponent;
        let fixture: ComponentFixture<EmployeeSalaryMySuffixDialogComponent>;
        let service: EmployeeSalaryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [EmployeeSalaryMySuffixDialogComponent],
                providers: [
                    MonthOfYearMySuffixService,
                    EmployeeMySuffixService,
                    EmployeeSalaryMySuffixService
                ]
            })
            .overrideTemplate(EmployeeSalaryMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeSalaryMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeSalaryMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmployeeSalaryMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.employeeSalary = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'employeeSalaryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmployeeSalaryMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.employeeSalary = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'employeeSalaryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
