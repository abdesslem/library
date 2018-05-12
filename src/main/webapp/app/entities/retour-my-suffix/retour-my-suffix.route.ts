import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RetourMySuffixComponent } from './retour-my-suffix.component';
import { RetourMySuffixDetailComponent } from './retour-my-suffix-detail.component';
import { RetourMySuffixPopupComponent } from './retour-my-suffix-dialog.component';
import { RetourMySuffixDeletePopupComponent } from './retour-my-suffix-delete-dialog.component';

export const retourRoute: Routes = [
    {
        path: 'retour-my-suffix',
        component: RetourMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retours'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'retour-my-suffix/:id',
        component: RetourMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retours'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const retourPopupRoute: Routes = [
    {
        path: 'retour-my-suffix-new',
        component: RetourMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'retour-my-suffix/:id/edit',
        component: RetourMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'retour-my-suffix/:id/delete',
        component: RetourMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Retours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
