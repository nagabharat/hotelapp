/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HotelTestModule } from '../../../test.module';
import { BillsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix-detail.component';
import { BillsMySuffixService } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix.service';
import { BillsMySuffix } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix.model';

describe('Component Tests', () => {

    describe('BillsMySuffix Management Detail Component', () => {
        let comp: BillsMySuffixDetailComponent;
        let fixture: ComponentFixture<BillsMySuffixDetailComponent>;
        let service: BillsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [BillsMySuffixDetailComponent],
                providers: [
                    BillsMySuffixService
                ]
            })
            .overrideTemplate(BillsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BillsMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bills).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
