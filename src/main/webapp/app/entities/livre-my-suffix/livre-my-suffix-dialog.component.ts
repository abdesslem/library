import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LivreMySuffix } from './livre-my-suffix.model';
import { LivreMySuffixPopupService } from './livre-my-suffix-popup.service';
import { LivreMySuffixService } from './livre-my-suffix.service';
import { CategorieMySuffix, CategorieMySuffixService } from '../categorie-my-suffix';
import { CommandeMySuffix, CommandeMySuffixService } from '../commande-my-suffix';

@Component({
    selector: 'jhi-livre-my-suffix-dialog',
    templateUrl: './livre-my-suffix-dialog.component.html'
})
export class LivreMySuffixDialogComponent implements OnInit {

    livre: LivreMySuffix;
    isSaving: boolean;

    categories: CategorieMySuffix[];

    commandes: CommandeMySuffix[];
    dateeditionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private livreService: LivreMySuffixService,
        private categorieService: CategorieMySuffixService,
        private commandeService: CommandeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categorieService.query()
            .subscribe((res: HttpResponse<CategorieMySuffix[]>) => { this.categories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.commandeService.query()
            .subscribe((res: HttpResponse<CommandeMySuffix[]>) => { this.commandes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.livre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.livreService.update(this.livre));
        } else {
            this.subscribeToSaveResponse(
                this.livreService.create(this.livre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LivreMySuffix>>) {
        result.subscribe((res: HttpResponse<LivreMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LivreMySuffix) {
        this.eventManager.broadcast({ name: 'livreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategorieById(index: number, item: CategorieMySuffix) {
        return item.id;
    }

    trackCommandeById(index: number, item: CommandeMySuffix) {
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
    selector: 'jhi-livre-my-suffix-popup',
    template: ''
})
export class LivreMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private livrePopupService: LivreMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.livrePopupService
                    .open(LivreMySuffixDialogComponent as Component, params['id']);
            } else {
                this.livrePopupService
                    .open(LivreMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
