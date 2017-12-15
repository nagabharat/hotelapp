/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HotelTestModule } from '../../../test.module';
import { SalaryComponentMySuffixComponent } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix.component';
import { SalaryComponentMySuffixService } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix.service';
import { SalaryComponentMySuffix } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix.model';

describe('Component Tests', () => {

    describe('SalaryComponentMySuffix Management Component', () => {
        let comp: SalaryComponentMySuffixComponent;
        let fixture: ComponentFixture<SalaryComponentMySuffixComponent>;
        let service: SalaryComponentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [SalaryComponentMySuffixComponent],
                providers: [
                    SalaryComponentMySuffixService
                ]
            })
            .overrideTemplate(SalaryComponentMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalaryComponentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalaryComponentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SalaryComponentMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.salaryComponents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
