import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RetourMySuffix } from './retour-my-suffix.model';
import { RetourMySuffixPopupService } from './retour-my-suffix-popup.service';
import { RetourMySuffixService } from './retour-my-suffix.service';
import { LivreMySuffix, LivreMySuffixService } from '../livre-my-suffix';
import { AbonneMySuffix, AbonneMySuffixService } from '../abonne-my-suffix';

@Component({
    selector: 'jhi-retour-my-suffix-dialog',
    templateUrl: './retour-my-suffix-dialog.component.html'
})
export class RetourMySuffixDialogComponent implements OnInit {

    retour: RetourMySuffix;
    isSaving: boolean;

    livres: LivreMySuffix[];

    abonnes: AbonneMySuffix[];
    dateretourDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private retourService: RetourMySuffixService,
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
        if (this.retour.id !== undefined) {
            this.subscribeToSaveResponse(
                this.retourService.update(this.retour));
        } else {
            this.subscribeToSaveResponse(
                this.retourService.create(this.retour));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RetourMySuffix>>) {
        result.subscribe((res: HttpResponse<RetourMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RetourMySuffix) {
        this.eventManager.broadcast({ name: 'retourListModification', content: 'OK'});
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
    selector: 'jhi-retour-my-suffix-popup',
    template: ''
})
export class RetourMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private retourPopupService: RetourMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.retourPopupService
                    .open(RetourMySuffixDialogComponent as Component, params['id']);
            } else {
                this.retourPopupService
                    .open(RetourMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
