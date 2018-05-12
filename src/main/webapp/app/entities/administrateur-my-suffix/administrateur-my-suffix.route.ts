import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AdministrateurMySuffixComponent } from './administrateur-my-suffix.component';
import { AdministrateurMySuffixDetailComponent } from './administrateur-my-suffix-detail.component';
import { AdministrateurMySuffixPopupComponent } from './administrateur-my-suffix-dialog.component';
import { AdministrateurMySuffixDeletePopupComponent } from './administrateur-my-suffix-delete-dialog.component';

export const administrateurRoute: Routes = [
    {
        path: 'administrateur-my-suffix',
        component: AdministrateurMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administrateurs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'administrateur-my-suffix/:id',
        component: AdministrateurMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administrateurs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const administrateurPopupRoute: Routes = [
    {
        path: 'administrateur-my-suffix-new',
        component: AdministrateurMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administrateurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'administrateur-my-suffix/:id/edit',
        component: AdministrateurMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administrateurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'administrateur-my-suffix/:id/delete',
        component: AdministrateurMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Administrateurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
