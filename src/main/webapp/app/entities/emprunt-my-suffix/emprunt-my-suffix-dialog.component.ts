import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmpruntMySuffix } from './emprunt-my-suffix.model';
import { EmpruntMySuffixPopupService } from './emprunt-my-suffix-popup.service';
import { EmpruntMySuffixService } from './emprunt-my-suffix.service';
import { LivreMySuffix, LivreMySuffixService } from '../livre-my-suffix';
import { AbonneMySuffix, AbonneMySuffixService } from '../abonne-my-suffix';

@Component({
    selector: 'jhi-emprunt-my-suffix-dialog',
    templateUrl: './emprunt-my-suffix-dialog.component.html'
})
export class EmpruntMySuffixDialogComponent implements OnInit {

    emprunt: EmpruntMySuffix;
    isSaving: boolean;

    livres: LivreMySuffix[];

    abonnes: AbonneMySuffix[];
    dateempruntDp: any;
    dateretourlimiteDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private empruntService: EmpruntMySuffixService,
        private livreService: LivreMySuffixService,
        private abonneService: AbonneMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.livreService.query()
            .subscribe((res: HttpResponse<LivreMySuffix[]>) => { this.livres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.abonneService.query()
            .subscribe((res: HttpResponse<AbonneMySuffix[]>) => { this.abonnes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emprunt.id !== undefined) {
            this.subscribeToSaveResponse(
                this.empruntService.update(this.emprunt));
        } else {
            this.subscribeToSaveResponse(
                this.empruntService.create(this.emprunt));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EmpruntMySuffix>>) {
        result.subscribe((res: HttpResponse<EmpruntMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EmpruntMySuffix) {
        this.eventManager.broadcast({ name: 'empruntListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLivreById(index: number, item: LivreMySuffix) {
        return item.id;
    }

    trackAbonneById(index: number, item: AbonneMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-emprunt-my-suffix-popup',
    template: ''
})
export class EmpruntMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empruntPopupService: EmpruntMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.empruntPopupService
                    .open(EmpruntMySuffixDialogComponent as Component, params['id']);
            } else {
                this.empruntPopupService
                    .open(EmpruntMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
