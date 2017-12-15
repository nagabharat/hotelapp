/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HotelTestModule } from '../../../test.module';
import { EmployeeSalarySlipMySuffixComponent } from '../../../../../../main/webapp/app/entities/employee-salary-slip-my-suffix/employee-salary-slip-my-suffix.component';
import { EmployeeSalarySlipMySuffixService } from '../../../../../../main/webapp/app/entities/employee-salary-slip-my-suffix/employee-salary-slip-my-suffix.service';
import { EmployeeSalarySlipMySuffix } from '../../../../../../main/webapp/app/entities/employee-salary-slip-my-suffix/employee-salary-slip-my-suffix.model';

describe('Component Tests', () => {

    describe('EmployeeSalarySlipMySuffix Management Component', () => {
        let comp: EmployeeSalarySlipMySuffixComponent;
        let fixture: ComponentFixture<EmployeeSalarySlipMySuffixComponent>;
        let service: EmployeeSalarySlipMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [EmployeeSalarySlipMySuffixComponent],
                providers: [
                    EmployeeSalarySlipMySuffixService
                ]
            })
            .overrideTemplate(EmployeeSalarySlipMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeSalarySlipMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeSalarySlipMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmployeeSalarySlipMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employeeSalarySlips[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
