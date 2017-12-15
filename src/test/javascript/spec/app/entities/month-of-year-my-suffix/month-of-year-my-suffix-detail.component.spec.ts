/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HotelTestModule } from '../../../test.module';
import { MonthOfYearMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix-detail.component';
import { MonthOfYearMySuffixService } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix.service';
import { MonthOfYearMySuffix } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix.model';

describe('Component Tests', () => {

    describe('MonthOfYearMySuffix Management Detail Component', () => {
        let comp: MonthOfYearMySuffixDetailComponent;
        let fixture: ComponentFixture<MonthOfYearMySuffixDetailComponent>;
        let service: MonthOfYearMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [MonthOfYearMySuffixDetailComponent],
                providers: [
                    MonthOfYearMySuffixService
                ]
            })
            .overrideTemplate(MonthOfYearMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MonthOfYearMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MonthOfYearMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new MonthOfYearMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.monthOfYear).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
