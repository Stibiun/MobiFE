import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { EducationalInstitution } from './educational-institution.model';
import { EducationalInstitutionService } from './educational-institution.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jee-educational-institution',
    templateUrl: './educational-institution.component.html'
})
export class EducationalInstitutionComponent implements OnInit, OnDestroy {
educationalInstitutions: EducationalInstitution[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private educationalInstitutionService: EducationalInstitutionService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.educationalInstitutionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.educationalInstitutions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEducationalInstitutions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EducationalInstitution) {
        return item.id;
    }
    registerChangeInEducationalInstitutions() {
        this.eventSubscriber = this.eventManager.subscribe('educationalInstitutionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
