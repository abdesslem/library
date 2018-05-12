import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from '../../shared';
import {
    LivreMySuffixService,
    LivreMySuffixPopupService,
    LivreMySuffixComponent,
    LivreMySuffixDetailComponent,
    LivreMySuffixDialogComponent,
    LivreMySuffixPopupComponent,
    LivreMySuffixDeletePopupComponent,
    LivreMySuffixDeleteDialogComponent,
    livreRoute,
    livrePopupRoute,
} from './';

const ENTITY_STATES = [
    ...livreRoute,
    ...livrePopupRoute,
];

@NgModule({
    imports: [
        LibrarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LivreMySuffixComponent,
        LivreMySuffixDetailComponent,
        LivreMySuffixDialogComponent,
        LivreMySuffixDeleteDialogComponent,
        LivreMySuffixPopupComponent,
        LivreMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        LivreMySuffixComponent,
        LivreMySuffixDialogComponent,
        LivreMySuffixPopupComponent,
        LivreMySuffixDeleteDialogComponent,
        LivreMySuffixDeletePopupComponent,
    ],
    providers: [
        LivreMySuffixService,
        LivreMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryLivreMySuffixModule {}
