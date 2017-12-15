/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HotelTestModule } from '../../../test.module';
import { EmployeeSalaryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix-detail.component';
import { EmployeeSalaryMySuffixService } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix.service';
import { EmployeeSalaryMySuffix } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix.model';

describe('Component Tests', () => {

    describe('EmployeeSalaryMySuffix Management Detail Component', () => {
        let comp: EmployeeSalaryMySuffixDetailComponent;
        let fixture: ComponentFixture<EmployeeSalaryMySuffixDetailComponent>;
        let service: EmployeeSalaryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [EmployeeSalaryMySuffixDetailComponent],
                providers: [
                    EmployeeSalaryMySuffixService
                ]
            })
            .overrideTemplate(EmployeeSalaryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeSalaryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeSalaryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmployeeSalaryMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employeeSalary).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
