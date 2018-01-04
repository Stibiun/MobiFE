import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { InstitutionUnityComponent } from './institution-unity.component';
import { InstitutionUnityDetailComponent } from './institution-unity-detail.component';
import { InstitutionUnityPopupComponent } from './institution-unity-dialog.component';
import { InstitutionUnityDeletePopupComponent } from './institution-unity-delete-dialog.component';

export const institutionUnityRoute: Routes = [
    {
        path: 'institution-unity',
        component: InstitutionUnityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.institutionUnity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'institution-unity/:id',
        component: InstitutionUnityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.institutionUnity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const institutionUnityPopupRoute: Routes = [
    {
        path: 'institution-unity-new',
        component: InstitutionUnityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.institutionUnity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'institution-unity/:id/edit',
        component: InstitutionUnityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.institutionUnity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'institution-unity/:id/delete',
        component: InstitutionUnityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.institutionUnity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
