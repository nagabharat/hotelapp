/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HotelTestModule } from '../../../test.module';
import { EmployeeSalarySlipMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/employee-salary-slip-my-suffix/employee-salary-slip-my-suffix-detail.component';
import { EmployeeSalarySlipMySuffixService } from '../../../../../../main/webapp/app/entities/employee-salary-slip-my-suffix/employee-salary-slip-my-suffix.service';
import { EmployeeSalarySlipMySuffix } from '../../../../../../main/webapp/app/entities/employee-salary-slip-my-suffix/employee-salary-slip-my-suffix.model';

describe('Component Tests', () => {

    describe('EmployeeSalarySlipMySuffix Management Detail Component', () => {
        let comp: EmployeeSalarySlipMySuffixDetailComponent;
        let fixture: ComponentFixture<EmployeeSalarySlipMySuffixDetailComponent>;
        let service: EmployeeSalarySlipMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [EmployeeSalarySlipMySuffixDetailComponent],
                providers: [
                    EmployeeSalarySlipMySuffixService
                ]
            })
            .overrideTemplate(EmployeeSalarySlipMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeSalarySlipMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeSalarySlipMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmployeeSalarySlipMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employeeSalarySlip).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
