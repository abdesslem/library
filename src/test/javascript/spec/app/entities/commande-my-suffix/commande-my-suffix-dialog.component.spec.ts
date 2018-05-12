/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LibraryTestModule } from '../../../test.module';
import { CommandeMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix-dialog.component';
import { CommandeMySuffixService } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix.service';
import { CommandeMySuffix } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix.model';
import { AdministrateurMySuffixService } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix';
import { LivreMySuffixService } from '../../../../../../main/webapp/app/entities/livre-my-suffix';
import { FournisseurMySuffixService } from '../../../../../../main/webapp/app/entities/fournisseur-my-suffix';

describe('Component Tests', () => {

    describe('CommandeMySuffix Management Dialog Component', () => {
        let comp: CommandeMySuffixDialogComponent;
        let fixture: ComponentFixture<CommandeMySuffixDialogComponent>;
        let service: CommandeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [CommandeMySuffixDialogComponent],
                providers: [
                    AdministrateurMySuffixService,
                    LivreMySuffixService,
                    FournisseurMySuffixService,
                    CommandeMySuffixService
                ]
            })
            .overrideTemplate(CommandeMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommandeMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandeMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CommandeMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.commande = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'commandeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CommandeMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.commande = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'commandeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
