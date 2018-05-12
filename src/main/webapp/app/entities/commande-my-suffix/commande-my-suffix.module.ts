import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from '../../shared';
import {
    CommandeMySuffixService,
    CommandeMySuffixPopupService,
    CommandeMySuffixComponent,
    CommandeMySuffixDetailComponent,
    CommandeMySuffixDialogComponent,
    CommandeMySuffixPopupComponent,
    CommandeMySuffixDeletePopupComponent,
    CommandeMySuffixDeleteDialogComponent,
    commandeRoute,
    commandePopupRoute,
} from './';

const ENTITY_STATES = [
    ...commandeRoute,
    ...commandePopupRoute,
];

@NgModule({
    imports: [
        LibrarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommandeMySuffixComponent,
        CommandeMySuffixDetailComponent,
        CommandeMySuffixDialogComponent,
        CommandeMySuffixDeleteDialogComponent,
        CommandeMySuffixPopupComponent,
        CommandeMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CommandeMySuffixComponent,
        CommandeMySuffixDialogComponent,
        CommandeMySuffixPopupComponent,
        CommandeMySuffixDeleteDialogComponent,
        CommandeMySuffixDeletePopupComponent,
    ],
    providers: [
        CommandeMySuffixService,
        CommandeMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryCommandeMySuffixModule {}
