/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { BookingMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix-delete-dialog.component';
import { BookingMySuffixService } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix.service';

describe('Component Tests', () => {

    describe('BookingMySuffix Management Delete Component', () => {
        let comp: BookingMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<BookingMySuffixDeleteDialogComponent>;
        let service: BookingMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [BookingMySuffixDeleteDialogComponent],
                providers: [
                    BookingMySuffixService
                ]
            })
            .overrideTemplate(BookingMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
