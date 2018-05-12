import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommandeMySuffix } from './commande-my-suffix.model';
import { CommandeMySuffixPopupService } from './commande-my-suffix-popup.service';
import { CommandeMySuffixService } from './commande-my-suffix.service';

@Component({
    selector: 'jhi-commande-my-suffix-delete-dialog',
    templateUrl: './commande-my-suffix-delete-dialog.component.html'
})
export class CommandeMySuffixDeleteDialogComponent {

    commande: CommandeMySuffix;

    constructor(
        private commandeService: CommandeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commandeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commandeListModification',
                content: 'Deleted an commande'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-commande-my-suffix-delete-popup',
    template: ''
})
export class CommandeMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commandePopupService: CommandeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commandePopupService
                .open(CommandeMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
