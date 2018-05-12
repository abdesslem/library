import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AdministrateurMySuffix } from './administrateur-my-suffix.model';
import { AdministrateurMySuffixService } from './administrateur-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-administrateur-my-suffix',
    templateUrl: './administrateur-my-suffix.component.html'
})
export class AdministrateurMySuffixComponent implements OnInit, OnDestroy {
administrateurs: AdministrateurMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private administrateurService: AdministrateurMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.administrateurService.query().subscribe(
            (res: HttpResponse<AdministrateurMySuffix[]>) => {
                this.administrateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAdministrateurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AdministrateurMySuffix) {
        return item.id;
    }
    registerChangeInAdministrateurs() {
        this.eventSubscriber = this.eventManager.subscribe('administrateurListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
