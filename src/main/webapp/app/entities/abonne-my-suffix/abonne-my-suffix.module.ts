import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from '../../shared';
import {
    AbonneMySuffixService,
    AbonneMySuffixPopupService,
    AbonneMySuffixComponent,
    AbonneMySuffixDetailComponent,
    AbonneMySuffixDialogComponent,
    AbonneMySuffixPopupComponent,
    AbonneMySuffixDeletePopupComponent,
    AbonneMySuffixDeleteDialogComponent,
    abonneRoute,
    abonnePopupRoute,
} from './';

const ENTITY_STATES = [
    ...abonneRoute,
    ...abonnePopupRoute,
];

@NgModule({
    imports: [
        LibrarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AbonneMySuffixComponent,
        AbonneMySuffixDetailComponent,
        AbonneMySuffixDialogComponent,
        AbonneMySuffixDeleteDialogComponent,
        AbonneMySuffixPopupComponent,
        AbonneMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AbonneMySuffixComponent,
        AbonneMySuffixDialogComponent,
        AbonneMySuffixPopupComponent,
        AbonneMySuffixDeleteDialogComponent,
        AbonneMySuffixDeletePopupComponent,
    ],
    providers: [
        AbonneMySuffixService,
        AbonneMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryAbonneMySuffixModule {}
