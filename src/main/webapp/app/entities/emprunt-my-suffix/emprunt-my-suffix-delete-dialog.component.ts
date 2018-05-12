import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmpruntMySuffix } from './emprunt-my-suffix.model';
import { EmpruntMySuffixPopupService } from './emprunt-my-suffix-popup.service';
import { EmpruntMySuffixService } from './emprunt-my-suffix.service';

@Component({
    selector: 'jhi-emprunt-my-suffix-delete-dialog',
    templateUrl: './emprunt-my-suffix-delete-dialog.component.html'
})
export class EmpruntMySuffixDeleteDialogComponent {

    emprunt: EmpruntMySuffix;

    constructor(
        private empruntService: EmpruntMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.empruntService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'empruntListModification',
                content: 'Deleted an emprunt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-emprunt-my-suffix-delete-popup',
    template: ''
})
export class EmpruntMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empruntPopupService: EmpruntMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.empruntPopupService
                .open(EmpruntMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
