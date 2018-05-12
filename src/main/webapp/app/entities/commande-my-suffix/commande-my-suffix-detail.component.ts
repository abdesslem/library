import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CommandeMySuffix } from './commande-my-suffix.model';
import { CommandeMySuffixService } from './commande-my-suffix.service';

@Component({
    selector: 'jhi-commande-my-suffix-detail',
    templateUrl: './commande-my-suffix-detail.component.html'
})
export class CommandeMySuffixDetailComponent implements OnInit, OnDestroy {

    commande: CommandeMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commandeService: CommandeMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCommandes();
    }

    load(id) {
        this.commandeService.find(id)
            .subscribe((commandeResponse: HttpResponse<CommandeMySuffix>) => {
                this.commande = commandeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCommandes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commandeListModification',
            (response) => this.load(this.commande.id)
        );
    }
}
