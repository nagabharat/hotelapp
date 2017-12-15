/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HotelTestModule } from '../../../test.module';
import { BookingMySuffixComponent } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix.component';
import { BookingMySuffixService } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix.service';
import { BookingMySuffix } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix.model';

describe('Component Tests', () => {

    describe('BookingMySuffix Management Component', () => {
        let comp: BookingMySuffixComponent;
        let fixture: ComponentFixture<BookingMySuffixComponent>;
        let service: BookingMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [BookingMySuffixComponent],
                providers: [
                    BookingMySuffixService
                ]
            })
            .overrideTemplate(BookingMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BookingMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bookings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
