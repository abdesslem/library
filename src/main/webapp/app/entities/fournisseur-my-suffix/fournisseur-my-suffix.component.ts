import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FournisseurMySuffix } from './fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-fournisseur-my-suffix',
    templateUrl: './fournisseur-my-suffix.component.html'
})
export class FournisseurMySuffixComponent implements OnInit, OnDestroy {
fournisseurs: FournisseurMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fournisseurService: FournisseurMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fournisseurService.query().subscribe(
            (res: HttpResponse<FournisseurMySuffix[]>) => {
                this.fournisseurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFournisseurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FournisseurMySuffix) {
        return item.id;
    }
    registerChangeInFournisseurs() {
        this.eventSubscriber = this.eventManager.subscribe('fournisseurListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
