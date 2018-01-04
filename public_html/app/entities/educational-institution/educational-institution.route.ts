import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EducationalInstitutionComponent } from './educational-institution.component';
import { EducationalInstitutionDetailComponent } from './educational-institution-detail.component';
import { EducationalInstitutionPopupComponent } from './educational-institution-dialog.component';
import { EducationalInstitutionDeletePopupComponent } from './educational-institution-delete-dialog.component';

export const educationalInstitutionRoute: Routes = [
    {
        path: 'educational-institution',
        component: EducationalInstitutionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.educationalInstitution.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'educational-institution/:id',
        component: EducationalInstitutionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.educationalInstitution.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const educationalInstitutionPopupRoute: Routes = [
    {
        path: 'educational-institution-new',
        component: EducationalInstitutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.educationalInstitution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'educational-institution/:id/edit',
        component: EducationalInstitutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.educationalInstitution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'educational-institution/:id/delete',
        component: EducationalInstitutionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.educationalInstitution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
