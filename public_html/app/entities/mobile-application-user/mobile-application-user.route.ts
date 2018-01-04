import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MobileApplicationUserComponent } from './mobile-application-user.component';
import { MobileApplicationUserDetailComponent } from './mobile-application-user-detail.component';
import { MobileApplicationUserPopupComponent } from './mobile-application-user-dialog.component';
import { MobileApplicationUserDeletePopupComponent } from './mobile-application-user-delete-dialog.component';

export const mobileApplicationUserRoute: Routes = [
    {
        path: 'mobile-application-user',
        component: MobileApplicationUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.mobileApplicationUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mobile-application-user/:id',
        component: MobileApplicationUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.mobileApplicationUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mobileApplicationUserPopupRoute: Routes = [
    {
        path: 'mobile-application-user-new',
        component: MobileApplicationUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.mobileApplicationUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mobile-application-user/:id/edit',
        component: MobileApplicationUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.mobileApplicationUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mobile-application-user/:id/delete',
        component: MobileApplicationUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'webappApp.mobileApplicationUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
