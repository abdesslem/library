import { BaseEntity } from './../../shared';

export class FournisseurMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nomfournisseur?: string,
        public adressefournisseur?: string,
        public commandes?: BaseEntity[],
    ) {
    }
}
