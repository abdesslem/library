import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommandeMySuffix } from './commande-my-suffix.model';
import { CommandeMySuffixPopupService } from './commande-my-suffix-popup.service';
import { CommandeMySuffixService } from './commande-my-suffix.service';
import { AdministrateurMySuffix, AdministrateurMySuffixService } from '../administrateur-my-suffix';
import { LivreMySuffix, LivreMySuffixService } from '../livre-my-suffix';
import { FournisseurMySuffix, FournisseurMySuffixService } from '../fournisseur-my-suffix';

@Component({
    selector: 'jhi-commande-my-suffix-dialog',
    templateUrl: './commande-my-suffix-dialog.component.html'
})
export class CommandeMySuffixDialogComponent implements OnInit {

    commande: CommandeMySuffix;
    isSaving: boolean;

    administrateurs: AdministrateurMySuffix[];

    livres: LivreMySuffix[];

    fournisseurs: FournisseurMySuffix[];
    datecommandeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private commandeService: CommandeMySuffixService,
        private administrateurService: AdministrateurMySuffixService,
        private livreService: LivreMySuffixService,
        private fournisseurService: FournisseurMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.administrateurService.query()
            .subscribe((res: HttpResponse<AdministrateurMySuffix[]>) => { this.administrateurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.livreService.query()
            .subscribe((res: HttpResponse<LivreMySuffix[]>) => { this.livres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.fournisseurService.query()
            .subscribe((res: HttpResponse<FournisseurMySuffix[]>) => { this.fournisseurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.commande.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commandeService.update(this.commande));
        } else {
            this.subscribeToSaveResponse(
                this.commandeService.create(this.commande));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CommandeMySuffix>>) {
        result.subscribe((res: HttpResponse<CommandeMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CommandeMySuffix) {
        this.eventManager.broadcast({ name: 'commandeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAdministrateurById(index: number, item: AdministrateurMySuffix) {
        return item.id;
    }

    trackLivreById(index: number, item: LivreMySuffix) {
        return item.id;
    }

    trackFournisseurById(index: number, item: FournisseurMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-commande-my-suffix-popup',
    template: ''
})
export class CommandeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commandePopupService: CommandeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commandePopupService
                    .open(CommandeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.commandePopupService
                    .open(CommandeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
