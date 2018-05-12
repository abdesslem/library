import { BaseEntity } from './../../shared';

export class AbonneMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public ncin?: number,
        public nom?: string,
        public prenom?: string,
        public datenaissance?: any,
    ) {
    }
}
