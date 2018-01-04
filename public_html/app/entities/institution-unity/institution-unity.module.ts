import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebappSharedModule } from '../../shared';
import {
    InstitutionUnityService,
    InstitutionUnityPopupService,
    InstitutionUnityComponent,
    InstitutionUnityDetailComponent,
    InstitutionUnityDialogComponent,
    InstitutionUnityPopupComponent,
    InstitutionUnityDeletePopupComponent,
    InstitutionUnityDeleteDialogComponent,
    institutionUnityRoute,
    institutionUnityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...institutionUnityRoute,
    ...institutionUnityPopupRoute,
];

@NgModule({
    imports: [
        WebappSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InstitutionUnityComponent,
        InstitutionUnityDetailComponent,
        InstitutionUnityDialogComponent,
        InstitutionUnityDeleteDialogComponent,
        InstitutionUnityPopupComponent,
        InstitutionUnityDeletePopupComponent,
    ],
    entryComponents: [
        InstitutionUnityComponent,
        InstitutionUnityDialogComponent,
        InstitutionUnityPopupComponent,
        InstitutionUnityDeleteDialogComponent,
        InstitutionUnityDeletePopupComponent,
    ],
    providers: [
        InstitutionUnityService,
        InstitutionUnityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebappInstitutionUnityModule {}
