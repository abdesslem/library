import { BaseEntity } from './../../shared';

export class CategorieMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nomcategorie?: string,
        public description?: string,
    ) {
    }
}
