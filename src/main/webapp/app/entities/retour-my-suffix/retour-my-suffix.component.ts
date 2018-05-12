import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RetourMySuffix } from './retour-my-suffix.model';
import { RetourMySuffixService } from './retour-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-retour-my-suffix',
    templateUrl: './retour-my-suffix.component.html'
})
export class RetourMySuffixComponent implements OnInit, OnDestroy {
retours: RetourMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private retourService: RetourMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.retourService.query().subscribe(
            (res: HttpResponse<RetourMySuffix[]>) => {
                this.retours = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRetours();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RetourMySuffix) {
        return item.id;
    }
    registerChangeInRetours() {
        this.eventSubscriber = this.eventManager.subscribe('retourListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
