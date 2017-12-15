/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HotelTestModule } from '../../../test.module';
import { EmployeeSalaryMySuffixComponent } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix.component';
import { EmployeeSalaryMySuffixService } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix.service';
import { EmployeeSalaryMySuffix } from '../../../../../../main/webapp/app/entities/employee-salary-my-suffix/employee-salary-my-suffix.model';

describe('Component Tests', () => {

    describe('EmployeeSalaryMySuffix Management Component', () => {
        let comp: EmployeeSalaryMySuffixComponent;
        let fixture: ComponentFixture<EmployeeSalaryMySuffixComponent>;
        let service: EmployeeSalaryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [EmployeeSalaryMySuffixComponent],
                providers: [
                    EmployeeSalaryMySuffixService
                ]
            })
            .overrideTemplate(EmployeeSalaryMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeSalaryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeSalaryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmployeeSalaryMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employeeSalaries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
