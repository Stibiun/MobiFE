import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebappSharedModule } from '../../shared';
import {
    EducationalInstitutionService,
    EducationalInstitutionPopupService,
    EducationalInstitutionComponent,
    EducationalInstitutionDetailComponent,
    EducationalInstitutionDialogComponent,
    EducationalInstitutionPopupComponent,
    EducationalInstitutionDeletePopupComponent,
    EducationalInstitutionDeleteDialogComponent,
    educationalInstitutionRoute,
    educationalInstitutionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...educationalInstitutionRoute,
    ...educationalInstitutionPopupRoute,
];

@NgModule({
    imports: [
        WebappSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EducationalInstitutionComponent,
        EducationalInstitutionDetailComponent,
        EducationalInstitutionDialogComponent,
        EducationalInstitutionDeleteDialogComponent,
        EducationalInstitutionPopupComponent,
        EducationalInstitutionDeletePopupComponent,
    ],
    entryComponents: [
        EducationalInstitutionComponent,
        EducationalInstitutionDialogComponent,
        EducationalInstitutionPopupComponent,
        EducationalInstitutionDeleteDialogComponent,
        EducationalInstitutionDeletePopupComponent,
    ],
    providers: [
        EducationalInstitutionService,
        EducationalInstitutionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebappEducationalInstitutionModule {}
