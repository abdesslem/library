import { BaseEntity } from './../../shared';

export class RetourMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public dateretour?: any,
        public livreId?: number,
        public abonneId?: number,
    ) {
    }
}
