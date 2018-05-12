import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmpruntMySuffix } from './emprunt-my-suffix.model';
import { EmpruntMySuffixService } from './emprunt-my-suffix.service';

@Component({
    selector: 'jhi-emprunt-my-suffix-detail',
    templateUrl: './emprunt-my-suffix-detail.component.html'
})
export class EmpruntMySuffixDetailComponent implements OnInit, OnDestroy {

    emprunt: EmpruntMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private empruntService: EmpruntMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmprunts();
    }

    load(id) {
        this.empruntService.find(id)
            .subscribe((empruntResponse: HttpResponse<EmpruntMySuffix>) => {
                this.emprunt = empruntResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmprunts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'empruntListModification',
            (response) => this.load(this.emprunt.id)
        );
    }
}
