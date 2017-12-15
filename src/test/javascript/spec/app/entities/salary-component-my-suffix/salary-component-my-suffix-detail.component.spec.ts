/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HotelTestModule } from '../../../test.module';
import { SalaryComponentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix-detail.component';
import { SalaryComponentMySuffixService } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix.service';
import { SalaryComponentMySuffix } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix.model';

describe('Component Tests', () => {

    describe('SalaryComponentMySuffix Management Detail Component', () => {
        let comp: SalaryComponentMySuffixDetailComponent;
        let fixture: ComponentFixture<SalaryComponentMySuffixDetailComponent>;
        let service: SalaryComponentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [SalaryComponentMySuffixDetailComponent],
                providers: [
                    SalaryComponentMySuffixService
                ]
            })
            .overrideTemplate(SalaryComponentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalaryComponentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalaryComponentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SalaryComponentMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.salaryComponent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
