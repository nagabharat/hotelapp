/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HotelTestModule } from '../../../test.module';
import { BillsMySuffixComponent } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix.component';
import { BillsMySuffixService } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix.service';
import { BillsMySuffix } from '../../../../../../main/webapp/app/entities/bills-my-suffix/bills-my-suffix.model';

describe('Component Tests', () => {

    describe('BillsMySuffix Management Component', () => {
        let comp: BillsMySuffixComponent;
        let fixture: ComponentFixture<BillsMySuffixComponent>;
        let service: BillsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [BillsMySuffixComponent],
                providers: [
                    BillsMySuffixService
                ]
            })
            .overrideTemplate(BillsMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BillsMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
