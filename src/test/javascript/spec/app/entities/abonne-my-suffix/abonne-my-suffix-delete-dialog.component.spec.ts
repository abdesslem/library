/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { AbonneMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/abonne-my-suffix/abonne-my-suffix-delete-dialog.component';
import { AbonneMySuffixService } from '../../../../../../main/webapp/app/entities/abonne-my-suffix/abonne-my-suffix.service';

describe('Component Tests', () => {

    describe('AbonneMySuffix Management Delete Component', () => {
        let comp: AbonneMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AbonneMySuffixDeleteDialogComponent>;
        let service: AbonneMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [AbonneMySuffixDeleteDialogComponent],
                providers: [
                    AbonneMySuffixService
                ]
            })
            .overrideTemplate(AbonneMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbonneMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbonneMySuffixService);
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
