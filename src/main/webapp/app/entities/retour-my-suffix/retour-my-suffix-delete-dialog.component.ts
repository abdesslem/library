import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RetourMySuffix } from './retour-my-suffix.model';
import { RetourMySuffixPopupService } from './retour-my-suffix-popup.service';
import { RetourMySuffixService } from './retour-my-suffix.service';

@Component({
    selector: 'jhi-retour-my-suffix-delete-dialog',
    templateUrl: './retour-my-suffix-delete-dialog.component.html'
})
export class RetourMySuffixDeleteDialogComponent {

    retour: RetourMySuffix;

    constructor(
        private retourService: RetourMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.retourService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'retourListModification',
                content: 'Deleted an retour'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-retour-my-suffix-delete-popup',
    template: ''
})
export class RetourMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private retourPopupService: RetourMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.retourPopupService
                .open(RetourMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
