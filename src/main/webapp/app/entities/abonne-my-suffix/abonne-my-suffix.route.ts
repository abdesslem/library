import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AbonneMySuffixComponent } from './abonne-my-suffix.component';
import { AbonneMySuffixDetailComponent } from './abonne-my-suffix-detail.component';
import { AbonneMySuffixPopupComponent } from './abonne-my-suffix-dialog.component';
import { AbonneMySuffixDeletePopupComponent } from './abonne-my-suffix-delete-dialog.component';

export const abonneRoute: Routes = [
    {
        path: 'abonne-my-suffix',
        component: AbonneMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abonnes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'abonne-my-suffix/:id',
        component: AbonneMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abonnes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const abonnePopupRoute: Routes = [
    {
        path: 'abonne-my-suffix-new',
        component: AbonneMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abonnes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'abonne-my-suffix/:id/edit',
        component: AbonneMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abonnes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'abonne-my-suffix/:id/delete',
        component: AbonneMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abonnes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
