import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AbonneMySuffix } from './abonne-my-suffix.model';
import { AbonneMySuffixPopupService } from './abonne-my-suffix-popup.service';
import { AbonneMySuffixService } from './abonne-my-suffix.service';

@Component({
    selector: 'jhi-abonne-my-suffix-dialog',
    templateUrl: './abonne-my-suffix-dialog.component.html'
})
export class AbonneMySuffixDialogComponent implements OnInit {

    abonne: AbonneMySuffix;
    isSaving: boolean;
    datenaissanceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private abonneService: AbonneMySuffixService,
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
        if (this.abonne.id !== undefined) {
            this.subscribeToSaveResponse(
                this.abonneService.update(this.abonne));
        } else {
            this.subscribeToSaveResponse(
                this.abonneService.create(this.abonne));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AbonneMySuffix>>) {
        result.subscribe((res: HttpResponse<AbonneMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AbonneMySuffix) {
        this.eventManager.broadcast({ name: 'abonneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-abonne-my-suffix-popup',
    template: ''
})
export class AbonneMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private abonnePopupService: AbonneMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.abonnePopupService
                    .open(AbonneMySuffixDialogComponent as Component, params['id']);
            } else {
                this.abonnePopupService
                    .open(AbonneMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
