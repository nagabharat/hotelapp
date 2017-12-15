/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HotelTestModule } from '../../../test.module';
import { PettyCashMySuffixComponent } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix.component';
import { PettyCashMySuffixService } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix.service';
import { PettyCashMySuffix } from '../../../../../../main/webapp/app/entities/petty-cash-my-suffix/petty-cash-my-suffix.model';

describe('Component Tests', () => {

    describe('PettyCashMySuffix Management Component', () => {
        let comp: PettyCashMySuffixComponent;
        let fixture: ComponentFixture<PettyCashMySuffixComponent>;
        let service: PettyCashMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [PettyCashMySuffixComponent],
                providers: [
                    PettyCashMySuffixService
                ]
            })
            .overrideTemplate(PettyCashMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PettyCashMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PettyCashMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PettyCashMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pettyCashes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
