import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AdministrateurMySuffix } from './administrateur-my-suffix.model';
import { AdministrateurMySuffixService } from './administrateur-my-suffix.service';

@Component({
    selector: 'jhi-administrateur-my-suffix-detail',
    templateUrl: './administrateur-my-suffix-detail.component.html'
})
export class AdministrateurMySuffixDetailComponent implements OnInit, OnDestroy {

    administrateur: AdministrateurMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private administrateurService: AdministrateurMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAdministrateurs();
    }

    load(id) {
        this.administrateurService.find(id)
            .subscribe((administrateurResponse: HttpResponse<AdministrateurMySuffix>) => {
                this.administrateur = administrateurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAdministrateurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'administrateurListModification',
            (response) => this.load(this.administrateur.id)
        );
    }
}
