import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from '../../shared';
import {
    EmpruntMySuffixService,
    EmpruntMySuffixPopupService,
    EmpruntMySuffixComponent,
    EmpruntMySuffixDetailComponent,
    EmpruntMySuffixDialogComponent,
    EmpruntMySuffixPopupComponent,
    EmpruntMySuffixDeletePopupComponent,
    EmpruntMySuffixDeleteDialogComponent,
    empruntRoute,
    empruntPopupRoute,
} from './';

const ENTITY_STATES = [
    ...empruntRoute,
    ...empruntPopupRoute,
];

@NgModule({
    imports: [
        LibrarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmpruntMySuffixComponent,
        EmpruntMySuffixDetailComponent,
        EmpruntMySuffixDialogComponent,
        EmpruntMySuffixDeleteDialogComponent,
        EmpruntMySuffixPopupComponent,
        EmpruntMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EmpruntMySuffixComponent,
        EmpruntMySuffixDialogComponent,
        EmpruntMySuffixPopupComponent,
        EmpruntMySuffixDeleteDialogComponent,
        EmpruntMySuffixDeletePopupComponent,
    ],
    providers: [
        EmpruntMySuffixService,
        EmpruntMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryEmpruntMySuffixModule {}
