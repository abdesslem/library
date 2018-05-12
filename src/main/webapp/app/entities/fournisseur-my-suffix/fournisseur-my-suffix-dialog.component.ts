import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FournisseurMySuffix } from './fournisseur-my-suffix.model';
import { FournisseurMySuffixPopupService } from './fournisseur-my-suffix-popup.service';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';

@Component({
    selector: 'jhi-fournisseur-my-suffix-dialog',
    templateUrl: './fournisseur-my-suffix-dialog.component.html'
})
export class FournisseurMySuffixDialogComponent implements OnInit {

    fournisseur: FournisseurMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private fournisseurService: FournisseurMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fournisseur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fournisseurService.update(this.fournisseur));
        } else {
            this.subscribeToSaveResponse(
                this.fournisseurService.create(this.fournisseur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FournisseurMySuffix>>) {
        result.subscribe((res: HttpResponse<FournisseurMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FournisseurMySuffix) {
        this.eventManager.broadcast({ name: 'fournisseurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-fournisseur-my-suffix-popup',
    template: ''
})
export class FournisseurMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fournisseurPopupService: FournisseurMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fournisseurPopupService
                    .open(FournisseurMySuffixDialogComponent as Component, params['id']);
            } else {
                this.fournisseurPopupService
                    .open(FournisseurMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
