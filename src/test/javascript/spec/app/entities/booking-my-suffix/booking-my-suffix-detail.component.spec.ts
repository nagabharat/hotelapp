/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HotelTestModule } from '../../../test.module';
import { BookingMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix-detail.component';
import { BookingMySuffixService } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix.service';
import { BookingMySuffix } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix.model';

describe('Component Tests', () => {

    describe('BookingMySuffix Management Detail Component', () => {
        let comp: BookingMySuffixDetailComponent;
        let fixture: ComponentFixture<BookingMySuffixDetailComponent>;
        let service: BookingMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [BookingMySuffixDetailComponent],
                providers: [
                    BookingMySuffixService
                ]
            })
            .overrideTemplate(BookingMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BookingMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.booking).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
