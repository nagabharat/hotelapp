/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HotelTestModule } from '../../../test.module';
import { RoomMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix-detail.component';
import { RoomMySuffixService } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix.service';
import { RoomMySuffix } from '../../../../../../main/webapp/app/entities/room-my-suffix/room-my-suffix.model';

describe('Component Tests', () => {

    describe('RoomMySuffix Management Detail Component', () => {
        let comp: RoomMySuffixDetailComponent;
        let fixture: ComponentFixture<RoomMySuffixDetailComponent>;
        let service: RoomMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [RoomMySuffixDetailComponent],
                providers: [
                    RoomMySuffixService
                ]
            })
            .overrideTemplate(RoomMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoomMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RoomMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.room).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
