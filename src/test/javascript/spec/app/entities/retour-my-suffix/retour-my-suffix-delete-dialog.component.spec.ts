/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { RetourMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/retour-my-suffix/retour-my-suffix-delete-dialog.component';
import { RetourMySuffixService } from '../../../../../../main/webapp/app/entities/retour-my-suffix/retour-my-suffix.service';

describe('Component Tests', () => {

    describe('RetourMySuffix Management Delete Component', () => {
        let comp: RetourMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RetourMySuffixDeleteDialogComponent>;
        let service: RetourMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [RetourMySuffixDeleteDialogComponent],
                providers: [
                    RetourMySuffixService
                ]
            })
            .overrideTemplate(RetourMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RetourMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetourMySuffixService);
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
