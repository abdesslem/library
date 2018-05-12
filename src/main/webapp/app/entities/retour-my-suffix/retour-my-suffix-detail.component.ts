import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RetourMySuffix } from './retour-my-suffix.model';
import { RetourMySuffixService } from './retour-my-suffix.service';

@Component({
    selector: 'jhi-retour-my-suffix-detail',
    templateUrl: './retour-my-suffix-detail.component.html'
})
export class RetourMySuffixDetailComponent implements OnInit, OnDestroy {

    retour: RetourMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private retourService: RetourMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRetours();
    }

    load(id) {
        this.retourService.find(id)
            .subscribe((retourResponse: HttpResponse<RetourMySuffix>) => {
                this.retour = retourResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRetours() {
        this.eventSubscriber = this.eventManager.subscribe(
            'retourListModification',
            (response) => this.load(this.retour.id)
        );
    }
}
