import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CommandeMySuffixComponent } from './commande-my-suffix.component';
import { CommandeMySuffixDetailComponent } from './commande-my-suffix-detail.component';
import { CommandeMySuffixPopupComponent } from './commande-my-suffix-dialog.component';
import { CommandeMySuffixDeletePopupComponent } from './commande-my-suffix-delete-dialog.component';

export const commandeRoute: Routes = [
    {
        path: 'commande-my-suffix',
        component: CommandeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commandes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'commande-my-suffix/:id',
        component: CommandeMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commandes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commandePopupRoute: Routes = [
    {
        path: 'commande-my-suffix-new',
        component: CommandeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commandes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'commande-my-suffix/:id/edit',
        component: CommandeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commandes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'commande-my-suffix/:id/delete',
        component: CommandeMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Commandes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
