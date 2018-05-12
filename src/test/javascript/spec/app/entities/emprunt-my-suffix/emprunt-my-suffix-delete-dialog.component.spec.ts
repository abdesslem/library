/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { EmpruntMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/emprunt-my-suffix/emprunt-my-suffix-delete-dialog.component';
import { EmpruntMySuffixService } from '../../../../../../main/webapp/app/entities/emprunt-my-suffix/emprunt-my-suffix.service';

describe('Component Tests', () => {

    describe('EmpruntMySuffix Management Delete Component', () => {
        let comp: EmpruntMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EmpruntMySuffixDeleteDialogComponent>;
        let service: EmpruntMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [EmpruntMySuffixDeleteDialogComponent],
                providers: [
                    EmpruntMySuffixService
                ]
            })
            .overrideTemplate(EmpruntMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpruntMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpruntMySuffixService);
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
