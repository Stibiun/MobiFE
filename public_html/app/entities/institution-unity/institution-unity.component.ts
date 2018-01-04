import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { InstitutionUnity } from './institution-unity.model';
import { InstitutionUnityService } from './institution-unity.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jee-institution-unity',
    templateUrl: './institution-unity.component.html'
})
export class InstitutionUnityComponent implements OnInit, OnDestroy {
institutionUnities: InstitutionUnity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private institutionUnityService: InstitutionUnityService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.institutionUnityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.institutionUnities = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInstitutionUnities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InstitutionUnity) {
        return item.id;
    }
    registerChangeInInstitutionUnities() {
        this.eventSubscriber = this.eventManager.subscribe('institutionUnityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
