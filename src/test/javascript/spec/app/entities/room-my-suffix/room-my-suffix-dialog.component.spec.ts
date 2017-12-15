/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { RoomMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix-dialog.component';
import { RoomMySuffixService } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix.service';
import { RoomMySuffix } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix.model';
import { BookingMySuffixService } from '../../../../../../main/webapp/app/entities/booking-my-suffix';

describe('Component Tests', () => {

    describe('RoomMySuffix Management Dialog Component', () => {
        let comp: RoomMySuffixDialogComponent;
        let fixture: ComponentFixture<RoomMySuffixDialogComponent>;
        let service: RoomMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [RoomMySuffixDialogComponent],
                providers: [
                    BookingMySuffixService,
                    RoomMySuffixService
                ]
            })
            .overrideTemplate(RoomMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoomMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.room = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'roomListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoomMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.room = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'roomListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
