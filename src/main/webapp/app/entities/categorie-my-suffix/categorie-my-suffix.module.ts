import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from '../../shared';
import {
    CategorieMySuffixService,
    CategorieMySuffixPopupService,
    CategorieMySuffixComponent,
    CategorieMySuffixDetailComponent,
    CategorieMySuffixDialogComponent,
    CategorieMySuffixPopupComponent,
    CategorieMySuffixDeletePopupComponent,
    CategorieMySuffixDeleteDialogComponent,
    categorieRoute,
    categoriePopupRoute,
} from './';

const ENTITY_STATES = [
    ...categorieRoute,
    ...categoriePopupRoute,
];

@NgModule({
    imports: [
        LibrarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategorieMySuffixComponent,
        CategorieMySuffixDetailComponent,
        CategorieMySuffixDialogComponent,
        CategorieMySuffixDeleteDialogComponent,
        CategorieMySuffixPopupComponent,
        CategorieMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CategorieMySuffixComponent,
        CategorieMySuffixDialogComponent,
        CategorieMySuffixPopupComponent,
        CategorieMySuffixDeleteDialogComponent,
        CategorieMySuffixDeletePopupComponent,
    ],
    providers: [
        CategorieMySuffixService,
        CategorieMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryCategorieMySuffixModule {}
