import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LivreMySuffix } from './livre-my-suffix.model';
import { LivreMySuffixPopupService } from './livre-my-suffix-popup.service';
import { LivreMySuffixService } from './livre-my-suffix.service';

@Component({
    selector: 'jhi-livre-my-suffix-delete-dialog',
    templateUrl: './livre-my-suffix-delete-dialog.component.html'
})
export class LivreMySuffixDeleteDialogComponent {

    livre: LivreMySuffix;

    constructor(
        private livreService: LivreMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.livreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'livreListModification',
                content: 'Deleted an livre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-livre-my-suffix-delete-popup',
    template: ''
})
export class LivreMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private livrePopupService: LivreMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.livrePopupService
                .open(LivreMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
