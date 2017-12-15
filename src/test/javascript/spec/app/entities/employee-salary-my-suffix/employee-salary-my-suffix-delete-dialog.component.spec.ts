/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { EmployeeSalaryMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix-delete-dialog.component';
import { EmployeeSalaryMySuffixService } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix.service';

describe('Component Tests', () => {

    describe('EmployeeSalaryMySuffix Management Delete Component', () => {
        let comp: EmployeeSalaryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EmployeeSalaryMySuffixDeleteDialogComponent>;
        let service: EmployeeSalaryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [EmployeeSalaryMySuffixDeleteDialogComponent],
                providers: [
                    EmployeeSalaryMySuffixService
                ]
            })
            .overrideTemplate(EmployeeSalaryMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeSalaryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeSalaryMySuffixService);
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
