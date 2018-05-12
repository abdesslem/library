import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategorieMySuffix } from './categorie-my-suffix.model';
import { CategorieMySuffixPopupService } from './categorie-my-suffix-popup.service';
import { CategorieMySuffixService } from './categorie-my-suffix.service';

@Component({
    selector: 'jhi-categorie-my-suffix-dialog',
    templateUrl: './categorie-my-suffix-dialog.component.html'
})
export class CategorieMySuffixDialogComponent implements OnInit {

    categorie: CategorieMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private categorieService: CategorieMySuffixService,
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
        if (this.categorie.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categorieService.update(this.categorie));
        } else {
            this.subscribeToSaveResponse(
                this.categorieService.create(this.categorie));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CategorieMySuffix>>) {
        result.subscribe((res: HttpResponse<CategorieMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CategorieMySuffix) {
        this.eventManager.broadcast({ name: 'categorieListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-categorie-my-suffix-popup',
    template: ''
})
export class CategorieMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriePopupService: CategorieMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoriePopupService
                    .open(CategorieMySuffixDialogComponent as Component, params['id']);
            } else {
                this.categoriePopupService
                    .open(CategorieMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
