import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LibraryAdministrateurMySuffixModule } from './administrateur-my-suffix/administrateur-my-suffix.module';
import { LibraryAbonneMySuffixModule } from './abonne-my-suffix/abonne-my-suffix.module';
import { LibraryLivreMySuffixModule } from './livre-my-suffix/livre-my-suffix.module';
import { LibraryCategorieMySuffixModule } from './categorie-my-suffix/categorie-my-suffix.module';
import { LibraryRetourMySuffixModule } from './retour-my-suffix/retour-my-suffix.module';
import { LibraryEmpruntMySuffixModule } from './emprunt-my-suffix/emprunt-my-suffix.module';
import { LibraryCommandeMySuffixModule } from './commande-my-suffix/commande-my-suffix.module';
import { LibraryFournisseurMySuffixModule } from './fournisseur-my-suffix/fournisseur-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LibraryAdministrateurMySuffixModule,
        LibraryAbonneMySuffixModule,
        LibraryLivreMySuffixModule,
        LibraryCategorieMySuffixModule,
        LibraryRetourMySuffixModule,
        LibraryEmpruntMySuffixModule,
        LibraryCommandeMySuffixModule,
        LibraryFournisseurMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryEntityModule {}
