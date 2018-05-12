import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LivreMySuffix } from './livre-my-suffix.model';
import { LivreMySuffixService } from './livre-my-suffix.service';

@Component({
    selector: 'jhi-livre-my-suffix-detail',
    templateUrl: './livre-my-suffix-detail.component.html'
})
export class LivreMySuffixDetailComponent implements OnInit, OnDestroy {

    livre: LivreMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private livreService: LivreMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLivres();
    }

    load(id) {
        this.livreService.find(id)
            .subscribe((livreResponse: HttpResponse<LivreMySuffix>) => {
                this.livre = livreResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLivres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'livreListModification',
            (response) => this.load(this.livre.id)
        );
    }
}
