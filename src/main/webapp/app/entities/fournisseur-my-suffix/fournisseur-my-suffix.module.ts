import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from '../../shared';
import {
    FournisseurMySuffixService,
    FournisseurMySuffixPopupService,
    FournisseurMySuffixComponent,
    FournisseurMySuffixDetailComponent,
    FournisseurMySuffixDialogComponent,
    FournisseurMySuffixPopupComponent,
    FournisseurMySuffixDeletePopupComponent,
    FournisseurMySuffixDeleteDialogComponent,
    fournisseurRoute,
    fournisseurPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fournisseurRoute,
    ...fournisseurPopupRoute,
];

@NgModule({
    imports: [
        LibrarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FournisseurMySuffixComponent,
        FournisseurMySuffixDetailComponent,
        FournisseurMySuffixDialogComponent,
        FournisseurMySuffixDeleteDialogComponent,
        FournisseurMySuffixPopupComponent,
        FournisseurMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FournisseurMySuffixComponent,
        FournisseurMySuffixDialogComponent,
        FournisseurMySuffixPopupComponent,
        FournisseurMySuffixDeleteDialogComponent,
        FournisseurMySuffixDeletePopupComponent,
    ],
    providers: [
        FournisseurMySuffixService,
        FournisseurMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryFournisseurMySuffixModule {}
