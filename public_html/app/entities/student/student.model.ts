import { BaseEntity } from './../../shared';

export class Student implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public birthDate?: string,
        public picture?: string,
        public institutionUnity?: BaseEntity,
        public mobileApplicationUsers?: BaseEntity[],
    ) {
    }
}
