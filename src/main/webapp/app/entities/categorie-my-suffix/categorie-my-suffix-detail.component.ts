import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CategorieMySuffix } from './categorie-my-suffix.model';
import { CategorieMySuffixService } from './categorie-my-suffix.service';

@Component({
    selector: 'jhi-categorie-my-suffix-detail',
    templateUrl: './categorie-my-suffix-detail.component.html'
})
export class CategorieMySuffixDetailComponent implements OnInit, OnDestroy {

    categorie: CategorieMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private categorieService: CategorieMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCategories();
    }

    load(id) {
        this.categorieService.find(id)
            .subscribe((categorieResponse: HttpResponse<CategorieMySuffix>) => {
                this.categorie = categorieResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'categorieListModification',
            (response) => this.load(this.categorie.id)
        );
    }
}
