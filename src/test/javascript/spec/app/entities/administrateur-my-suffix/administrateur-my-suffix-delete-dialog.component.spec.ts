/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { AdministrateurMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix/administrateur-my-suffix-delete-dialog.component';
import { AdministrateurMySuffixService } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix/administrateur-my-suffix.service';

describe('Component Tests', () => {

    describe('AdministrateurMySuffix Management Delete Component', () => {
        let comp: AdministrateurMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AdministrateurMySuffixDeleteDialogComponent>;
        let service: AdministrateurMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [AdministrateurMySuffixDeleteDialogComponent],
                providers: [
                    AdministrateurMySuffixService
                ]
            })
            .overrideTemplate(AdministrateurMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdministrateurMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdministrateurMySuffixService);
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
