import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmpruntMySuffix } from './emprunt-my-suffix.model';
import { EmpruntMySuffixService } from './emprunt-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-emprunt-my-suffix',
    templateUrl: './emprunt-my-suffix.component.html'
})
export class EmpruntMySuffixComponent implements OnInit, OnDestroy {
emprunts: EmpruntMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private empruntService: EmpruntMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.empruntService.query().subscribe(
            (res: HttpResponse<EmpruntMySuffix[]>) => {
                this.emprunts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmprunts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmpruntMySuffix) {
        return item.id;
    }
    registerChangeInEmprunts() {
        this.eventSubscriber = this.eventManager.subscribe('empruntListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
