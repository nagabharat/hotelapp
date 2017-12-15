/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HotelTestModule } from '../../../test.module';
import { PettyCashMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix-detail.component';
import { PettyCashMySuffixService } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix.service';
import { PettyCashMySuffix } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix.model';

describe('Component Tests', () => {

    describe('PettyCashMySuffix Management Detail Component', () => {
        let comp: PettyCashMySuffixDetailComponent;
        let fixture: ComponentFixture<PettyCashMySuffixDetailComponent>;
        let service: PettyCashMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [PettyCashMySuffixDetailComponent],
                providers: [
                    PettyCashMySuffixService
                ]
            })
            .overrideTemplate(PettyCashMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PettyCashMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PettyCashMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PettyCashMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pettyCash).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
