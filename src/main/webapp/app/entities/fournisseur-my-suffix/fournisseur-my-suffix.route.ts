import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FournisseurMySuffixComponent } from './fournisseur-my-suffix.component';
import { FournisseurMySuffixDetailComponent } from './fournisseur-my-suffix-detail.component';
import { FournisseurMySuffixPopupComponent } from './fournisseur-my-suffix-dialog.component';
import { FournisseurMySuffixDeletePopupComponent } from './fournisseur-my-suffix-delete-dialog.component';

export const fournisseurRoute: Routes = [
    {
        path: 'fournisseur-my-suffix',
        component: FournisseurMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fournisseurs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fournisseur-my-suffix/:id',
        component: FournisseurMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fournisseurs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fournisseurPopupRoute: Routes = [
    {
        path: 'fournisseur-my-suffix-new',
        component: FournisseurMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fournisseurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fournisseur-my-suffix/:id/edit',
        component: FournisseurMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fournisseurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fournisseur-my-suffix/:id/delete',
        component: FournisseurMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fournisseurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
