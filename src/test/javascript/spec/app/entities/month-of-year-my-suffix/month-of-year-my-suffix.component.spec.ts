/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HotelTestModule } from '../../../test.module';
import { MonthOfYearMySuffixComponent } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix.component';
import { MonthOfYearMySuffixService } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix.service';
import { MonthOfYearMySuffix } from '../../../../../../main/webapp/app/entities/month-of-year-my-suffix/month-of-year-my-suffix.model';

describe('Component Tests', () => {

    describe('MonthOfYearMySuffix Management Component', () => {
        let comp: MonthOfYearMySuffixComponent;
        let fixture: ComponentFixture<MonthOfYearMySuffixComponent>;
        let service: MonthOfYearMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [MonthOfYearMySuffixComponent],
                providers: [
                    MonthOfYearMySuffixService
                ]
            })
            .overrideTemplate(MonthOfYearMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MonthOfYearMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MonthOfYearMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new MonthOfYearMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.monthOfYears[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
