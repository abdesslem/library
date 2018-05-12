import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AdministrateurMySuffix } from './administrateur-my-suffix.model';
import { AdministrateurMySuffixPopupService } from './administrateur-my-suffix-popup.service';
import { AdministrateurMySuffixService } from './administrateur-my-suffix.service';

@Component({
    selector: 'jhi-administrateur-my-suffix-delete-dialog',
    templateUrl: './administrateur-my-suffix-delete-dialog.component.html'
})
export class AdministrateurMySuffixDeleteDialogComponent {

    administrateur: AdministrateurMySuffix;

    constructor(
        private administrateurService: AdministrateurMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.administrateurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'administrateurListModification',
                content: 'Deleted an administrateur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-administrateur-my-suffix-delete-popup',
    template: ''
})
export class AdministrateurMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private administrateurPopupService: AdministrateurMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.administrateurPopupService
                .open(AdministrateurMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
