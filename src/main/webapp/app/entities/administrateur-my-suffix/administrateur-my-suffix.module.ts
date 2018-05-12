import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from '../../shared';
import {
    AdministrateurMySuffixService,
    AdministrateurMySuffixPopupService,
    AdministrateurMySuffixComponent,
    AdministrateurMySuffixDetailComponent,
    AdministrateurMySuffixDialogComponent,
    AdministrateurMySuffixPopupComponent,
    AdministrateurMySuffixDeletePopupComponent,
    AdministrateurMySuffixDeleteDialogComponent,
    administrateurRoute,
    administrateurPopupRoute,
} from './';

const ENTITY_STATES = [
    ...administrateurRoute,
    ...administrateurPopupRoute,
];

@NgModule({
    imports: [
        LibrarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AdministrateurMySuffixComponent,
        AdministrateurMySuffixDetailComponent,
        AdministrateurMySuffixDialogComponent,
        AdministrateurMySuffixDeleteDialogComponent,
        AdministrateurMySuffixPopupComponent,
        AdministrateurMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AdministrateurMySuffixComponent,
        AdministrateurMySuffixDialogComponent,
        AdministrateurMySuffixPopupComponent,
        AdministrateurMySuffixDeleteDialogComponent,
        AdministrateurMySuffixDeletePopupComponent,
    ],
    providers: [
        AdministrateurMySuffixService,
        AdministrateurMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryAdministrateurMySuffixModule {}
