import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LivreMySuffix } from './livre-my-suffix.model';
import { LivreMySuffixService } from './livre-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-livre-my-suffix',
    templateUrl: './livre-my-suffix.component.html'
})
export class LivreMySuffixComponent implements OnInit, OnDestroy {
livres: LivreMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private livreService: LivreMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.livreService.query().subscribe(
            (res: HttpResponse<LivreMySuffix[]>) => {
                this.livres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLivres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LivreMySuffix) {
        return item.id;
    }
    registerChangeInLivres() {
        this.eventSubscriber = this.eventManager.subscribe('livreListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
