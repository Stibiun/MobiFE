import { BaseEntity } from './../../shared';

export class MobileApplicationUser implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public password?: string,
        public salt?: string,
        public email?: string,
        public phone?: string,
        public students?: BaseEntity[],
    ) {
    }
}
