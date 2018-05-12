import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategorieMySuffix } from './categorie-my-suffix.model';
import { CategorieMySuffixPopupService } from './categorie-my-suffix-popup.service';
import { CategorieMySuffixService } from './categorie-my-suffix.service';

@Component({
    selector: 'jhi-categorie-my-suffix-delete-dialog',
    templateUrl: './categorie-my-suffix-delete-dialog.component.html'
})
export class CategorieMySuffixDeleteDialogComponent {

    categorie: CategorieMySuffix;

    constructor(
        private categorieService: CategorieMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categorieService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categorieListModification',
                content: 'Deleted an categorie'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categorie-my-suffix-delete-popup',
    template: ''
})
export class CategorieMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriePopupService: CategorieMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoriePopupService
                .open(CategorieMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
