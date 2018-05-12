import { BaseEntity } from './../../shared';

export class CommandeMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public qtecommande?: number,
        public datecommande?: any,
        public montant?: number,
        public administrateurId?: number,
        public livres?: BaseEntity[],
        public fournisseurId?: number,
    ) {
    }
}
