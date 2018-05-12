import { BaseEntity } from './../../shared';

export class EmpruntMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public dateemprunt?: any,
        public dateretourlimite?: any,
        public livreId?: number,
        public abonneId?: number,
    ) {
    }
}
