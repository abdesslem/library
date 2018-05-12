import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategorieMySuffixComponent } from './categorie-my-suffix.component';
import { CategorieMySuffixDetailComponent } from './categorie-my-suffix-detail.component';
import { CategorieMySuffixPopupComponent } from './categorie-my-suffix-dialog.component';
import { CategorieMySuffixDeletePopupComponent } from './categorie-my-suffix-delete-dialog.component';

export const categorieRoute: Routes = [
    {
        path: 'categorie-my-suffix',
        component: CategorieMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'categorie-my-suffix/:id',
        component: CategorieMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriePopupRoute: Routes = [
    {
        path: 'categorie-my-suffix-new',
        component: CategorieMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categorie-my-suffix/:id/edit',
        component: CategorieMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categorie-my-suffix/:id/delete',
        component: CategorieMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
