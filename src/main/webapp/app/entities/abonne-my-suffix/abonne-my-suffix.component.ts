import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AbonneMySuffix } from './abonne-my-suffix.model';
import { AbonneMySuffixService } from './abonne-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-abonne-my-suffix',
    templateUrl: './abonne-my-suffix.component.html'
})
export class AbonneMySuffixComponent implements OnInit, OnDestroy {
abonnes: AbonneMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private abonneService: AbonneMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.abonneService.query().subscribe(
            (res: HttpResponse<AbonneMySuffix[]>) => {
                this.abonnes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAbonnes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AbonneMySuffix) {
        return item.id;
    }
    registerChangeInAbonnes() {
        this.eventSubscriber = this.eventManager.subscribe('abonneListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
