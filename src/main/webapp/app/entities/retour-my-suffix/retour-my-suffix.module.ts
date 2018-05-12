import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LibrarySharedModule } from '../../shared';
import {
    RetourMySuffixService,
    RetourMySuffixPopupService,
    RetourMySuffixComponent,
    RetourMySuffixDetailComponent,
    RetourMySuffixDialogComponent,
    RetourMySuffixPopupComponent,
    RetourMySuffixDeletePopupComponent,
    RetourMySuffixDeleteDialogComponent,
    retourRoute,
    retourPopupRoute,
} from './';

const ENTITY_STATES = [
    ...retourRoute,
    ...retourPopupRoute,
];

@NgModule({
    imports: [
        LibrarySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RetourMySuffixComponent,
        RetourMySuffixDetailComponent,
        RetourMySuffixDialogComponent,
        RetourMySuffixDeleteDialogComponent,
        RetourMySuffixPopupComponent,
        RetourMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RetourMySuffixComponent,
        RetourMySuffixDialogComponent,
        RetourMySuffixPopupComponent,
        RetourMySuffixDeleteDialogComponent,
        RetourMySuffixDeletePopupComponent,
    ],
    providers: [
        RetourMySuffixService,
        RetourMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryRetourMySuffixModule {}
