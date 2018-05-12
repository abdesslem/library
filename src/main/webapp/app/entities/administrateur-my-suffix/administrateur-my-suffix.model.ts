import { BaseEntity } from './../../shared';

export class AdministrateurMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public login?: string,
        public mdp?: string,
        public firstname?: string,
        public lastname?: string,
        public email?: string,
        public adresse?: string,
        public commandes?: BaseEntity[],
    ) {
    }
}
