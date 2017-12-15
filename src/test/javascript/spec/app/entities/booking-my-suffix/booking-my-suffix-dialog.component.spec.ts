/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { BookingMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix-dialog.component';
import { BookingMySuffixService } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix.service';
import { BookingMySuffix } from '../../../../../../main/webapp/app/entities/booking-my-suffix/booking-my-suffix.model';
import { CustomerMySuffixService } from '../../../../../../main/webapp/app/entities/customer-my-suffix';

describe('Component Tests', () => {

    describe('BookingMySuffix Management Dialog Component', () => {
        let comp: BookingMySuffixDialogComponent;
        let fixture: ComponentFixture<BookingMySuffixDialogComponent>;
        let service: BookingMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [BookingMySuffixDialogComponent],
                providers: [
                    CustomerMySuffixService,
                    BookingMySuffixService
                ]
            })
            .overrideTemplate(BookingMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookingMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BookingMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.booking = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bookingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BookingMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.booking = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bookingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
