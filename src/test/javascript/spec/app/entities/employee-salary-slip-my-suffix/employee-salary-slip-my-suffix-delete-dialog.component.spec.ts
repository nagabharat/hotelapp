/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { EmployeeSalarySlipMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/employee-salary-slip-my-suffix/employee-salary-slip-my-suffix-delete-dialog.component';
import { EmployeeSalarySlipMySuffixService } from '../../../../../../main/webapp/app/entities/employee-salary-slip-my-suffix/employee-salary-slip-my-suffix.service';

describe('Component Tests', () => {

    describe('EmployeeSalarySlipMySuffix Management Delete Component', () => {
        let comp: EmployeeSalarySlipMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EmployeeSalarySlipMySuffixDeleteDialogComponent>;
        let service: EmployeeSalarySlipMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [EmployeeSalarySlipMySuffixDeleteDialogComponent],
                providers: [
                    EmployeeSalarySlipMySuffixService
                ]
            })
            .overrideTemplate(EmployeeSalarySlipMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeSalarySlipMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeSalarySlipMySuffixService);
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
