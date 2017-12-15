/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HotelTestModule } from '../../../test.module';
import { SalaryComponentMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix-delete-dialog.component';
import { SalaryComponentMySuffixService } from '../../../../../../main/webapp/app/entities/salary-component-my-suffix/salary-component-my-suffix.service';

describe('Component Tests', () => {

    describe('SalaryComponentMySuffix Management Delete Component', () => {
        let comp: SalaryComponentMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SalaryComponentMySuffixDeleteDialogComponent>;
        let service: SalaryComponentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HotelTestModule],
                declarations: [SalaryComponentMySuffixDeleteDialogComponent],
                providers: [
                    SalaryComponentMySuffixService
                ]
            })
            .overrideTemplate(SalaryComponentMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalaryComponentMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalaryComponentMySuffixService);
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
