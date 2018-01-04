import { BaseEntity } from './../../shared';

export class InstitutionUnity implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public adress?: string,
        public educationalInstitution?: BaseEntity,
    ) {
    }
}
