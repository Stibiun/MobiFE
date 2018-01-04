import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { MobileApplicationUser } from './mobile-application-user.model';
import { MobileApplicationUserService } from './mobile-application-user.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jee-mobile-application-user',
    templateUrl: './mobile-application-user.component.html'
})
export class MobileApplicationUserComponent implements OnInit, OnDestroy {
mobileApplicationUsers: MobileApplicationUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mobileApplicationUserService: MobileApplicationUserService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mobileApplicationUserService.query().subscribe(
            (res: ResponseWrapper) => {
                this.mobileApplicationUsers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMobileApplicationUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MobileApplicationUser) {
        return item.id;
    }
    registerChangeInMobileApplicationUsers() {
        this.eventSubscriber = this.eventManager.subscribe('mobileApplicationUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
