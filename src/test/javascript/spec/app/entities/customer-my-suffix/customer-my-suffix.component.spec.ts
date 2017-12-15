/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HotelTestModule } from '../../../test.module';
import { CustomerMySuffixComponent } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.component';
import { CustomerMySuffixService } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.service';
import { CustomerMySuffix } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.model';

describe('Component Tests', () => {

    describe('CustomerMySuffix Management Component', () => {
        let comp: CustomerMySuffixComponent;
        let fixture: ComponentFixture<CustomerMySuffixComponent>;
        let service: CustomerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [CustomerMySuffixComponent],
                providers: [
                    CustomerMySuffixService
                ]
            })
            .overrideTemplate(CustomerMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CustomerMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
