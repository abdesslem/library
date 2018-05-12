import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FournisseurMySuffix } from './fournisseur-my-suffix.model';
import { FournisseurMySuffixPopupService } from './fournisseur-my-suffix-popup.service';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';

@Component({
    selector: 'jhi-fournisseur-my-suffix-delete-dialog',
    templateUrl: './fournisseur-my-suffix-delete-dialog.component.html'
})
export class FournisseurMySuffixDeleteDialogComponent {

    fournisseur: FournisseurMySuffix;

    constructor(
        private fournisseurService: FournisseurMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fournisseurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fournisseurListModification',
                content: 'Deleted an fournisseur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fournisseur-my-suffix-delete-popup',
    template: ''
})
export class FournisseurMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fournisseurPopupService: FournisseurMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fournisseurPopupService
                .open(FournisseurMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
