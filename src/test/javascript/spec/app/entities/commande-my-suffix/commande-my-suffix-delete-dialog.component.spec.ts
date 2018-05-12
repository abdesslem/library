/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { CommandeMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix-delete-dialog.component';
import { CommandeMySuffixService } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix.service';

describe('Component Tests', () => {

    describe('CommandeMySuffix Management Delete Component', () => {
        let comp: CommandeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CommandeMySuffixDeleteDialogComponent>;
        let service: CommandeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [CommandeMySuffixDeleteDialogComponent],
                providers: [
                    CommandeMySuffixService
                ]
            })
            .overrideTemplate(CommandeMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommandeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandeMySuffixService);
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
