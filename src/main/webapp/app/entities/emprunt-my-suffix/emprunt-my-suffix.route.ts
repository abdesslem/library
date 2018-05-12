import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmpruntMySuffixComponent } from './emprunt-my-suffix.component';
import { EmpruntMySuffixDetailComponent } from './emprunt-my-suffix-detail.component';
import { EmpruntMySuffixPopupComponent } from './emprunt-my-suffix-dialog.component';
import { EmpruntMySuffixDeletePopupComponent } from './emprunt-my-suffix-delete-dialog.component';

export const empruntRoute: Routes = [
    {
        path: 'emprunt-my-suffix',
        component: EmpruntMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'emprunt-my-suffix/:id',
        component: EmpruntMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const empruntPopupRoute: Routes = [
    {
        path: 'emprunt-my-suffix-new',
        component: EmpruntMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'emprunt-my-suffix/:id/edit',
        component: EmpruntMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'emprunt-my-suffix/:id/delete',
        component: EmpruntMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
