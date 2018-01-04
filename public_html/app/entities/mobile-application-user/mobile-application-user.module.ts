import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebappSharedModule } from '../../shared';
import {
    MobileApplicationUserService,
    MobileApplicationUserPopupService,
    MobileApplicationUserComponent,
    MobileApplicationUserDetailComponent,
    MobileApplicationUserDialogComponent,
    MobileApplicationUserPopupComponent,
    MobileApplicationUserDeletePopupComponent,
    MobileApplicationUserDeleteDialogComponent,
    mobileApplicationUserRoute,
    mobileApplicationUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mobileApplicationUserRoute,
    ...mobileApplicationUserPopupRoute,
];

@NgModule({
    imports: [
        WebappSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MobileApplicationUserComponent,
        MobileApplicationUserDetailComponent,
        MobileApplicationUserDialogComponent,
        MobileApplicationUserDeleteDialogComponent,
        MobileApplicationUserPopupComponent,
        MobileApplicationUserDeletePopupComponent,
    ],
    entryComponents: [
        MobileApplicationUserComponent,
        MobileApplicationUserDialogComponent,
        MobileApplicationUserPopupComponent,
        MobileApplicationUserDeleteDialogComponent,
        MobileApplicationUserDeletePopupComponent,
    ],
    providers: [
        MobileApplicationUserService,
        MobileApplicationUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebappMobileApplicationUserModule {}
