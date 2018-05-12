import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AdministrateurMySuffix } from './administrateur-my-suffix.model';
import { AdministrateurMySuffixPopupService } from './administrateur-my-suffix-popup.service';
import { AdministrateurMySuffixService } from './administrateur-my-suffix.service';

@Component({
    selector: 'jhi-administrateur-my-suffix-dialog',
    templateUrl: './administrateur-my-suffix-dialog.component.html'
})
export class AdministrateurMySuffixDialogComponent implements OnInit {

    administrateur: AdministrateurMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private administrateurService: AdministrateurMySuffixService,
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
        if (this.administrateur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.administrateurService.update(this.administrateur));
        } else {
            this.subscribeToSaveResponse(
                this.administrateurService.create(this.administrateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AdministrateurMySuffix>>) {
        result.subscribe((res: HttpResponse<AdministrateurMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AdministrateurMySuffix) {
        this.eventManager.broadcast({ name: 'administrateurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-administrateur-my-suffix-popup',
    template: ''
})
export class AdministrateurMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private administrateurPopupService: AdministrateurMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.administrateurPopupService
                    .open(AdministrateurMySuffixDialogComponent as Component, params['id']);
            } else {
                this.administrateurPopupService
                    .open(AdministrateurMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
