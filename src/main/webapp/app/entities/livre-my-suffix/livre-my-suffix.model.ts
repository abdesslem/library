import { BaseEntity } from './../../shared';

export class LivreMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nomlivre?: string,
        public auteur?: string,
        public edition?: string,
        public dateedition?: any,
        public nbpages?: number,
        public categorieId?: number,
        public commandes?: BaseEntity[],
    ) {
    }
}
