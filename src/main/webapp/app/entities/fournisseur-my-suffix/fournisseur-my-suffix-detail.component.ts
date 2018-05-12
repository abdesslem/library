import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FournisseurMySuffix } from './fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';

@Component({
    selector: 'jhi-fournisseur-my-suffix-detail',
    templateUrl: './fournisseur-my-suffix-detail.component.html'
})
export class FournisseurMySuffixDetailComponent implements OnInit, OnDestroy {

    fournisseur: FournisseurMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fournisseurService: FournisseurMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFournisseurs();
    }

    load(id) {
        this.fournisseurService.find(id)
            .subscribe((fournisseurResponse: HttpResponse<FournisseurMySuffix>) => {
                this.fournisseur = fournisseurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFournisseurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fournisseurListModification',
            (response) => this.load(this.fournisseur.id)
        );
    }
}
