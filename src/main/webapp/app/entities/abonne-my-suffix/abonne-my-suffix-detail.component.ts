import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AbonneMySuffix } from './abonne-my-suffix.model';
import { AbonneMySuffixService } from './abonne-my-suffix.service';

@Component({
    selector: 'jhi-abonne-my-suffix-detail',
    templateUrl: './abonne-my-suffix-detail.component.html'
})
export class AbonneMySuffixDetailComponent implements OnInit, OnDestroy {

    abonne: AbonneMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private abonneService: AbonneMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAbonnes();
    }

    load(id) {
        this.abonneService.find(id)
            .subscribe((abonneResponse: HttpResponse<AbonneMySuffix>) => {
                this.abonne = abonneResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAbonnes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'abonneListModification',
            (response) => this.load(this.abonne.id)
        );
    }
}
