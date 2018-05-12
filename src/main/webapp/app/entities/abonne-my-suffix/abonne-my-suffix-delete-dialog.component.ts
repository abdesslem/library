import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AbonneMySuffix } from './abonne-my-suffix.model';
import { AbonneMySuffixPopupService } from './abonne-my-suffix-popup.service';
import { AbonneMySuffixService } from './abonne-my-suffix.service';

@Component({
    selector: 'jhi-abonne-my-suffix-delete-dialog',
    templateUrl: './abonne-my-suffix-delete-dialog.component.html'
})
export class AbonneMySuffixDeleteDialogComponent {

    abonne: AbonneMySuffix;

    constructor(
        private abonneService: AbonneMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.abonneService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'abonneListModification',
                content: 'Deleted an abonne'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-abonne-my-suffix-delete-popup',
    template: ''
})
export class AbonneMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private abonnePopupService: AbonneMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.abonnePopupService
                .open(AbonneMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
