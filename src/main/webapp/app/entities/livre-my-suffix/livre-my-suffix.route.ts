import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LivreMySuffixComponent } from './livre-my-suffix.component';
import { LivreMySuffixDetailComponent } from './livre-my-suffix-detail.component';
import { LivreMySuffixPopupComponent } from './livre-my-suffix-dialog.component';
import { LivreMySuffixDeletePopupComponent } from './livre-my-suffix-delete-dialog.component';

export const livreRoute: Routes = [
    {
        path: 'livre-my-suffix',
        component: LivreMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'livre-my-suffix/:id',
        component: LivreMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const livrePopupRoute: Routes = [
    {
        path: 'livre-my-suffix-new',
        component: LivreMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'livre-my-suffix/:id/edit',
        component: LivreMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'livre-my-suffix/:id/delete',
        component: LivreMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
