import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { InstitutionUnity } from './institution-unity.model';
import { InstitutionUnityService } from './institution-unity.service';

@Component({
    selector: 'jee-institution-unity-detail',
    templateUrl: './institution-unity-detail.component.html'
})
export class InstitutionUnityDetailComponent implements OnInit, OnDestroy {

    institutionUnity: InstitutionUnity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private institutionUnityService: InstitutionUnityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInstitutionUnities();
    }

    load(id) {
        this.institutionUnityService.find(id).subscribe((institutionUnity) => {
            this.institutionUnity = institutionUnity;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInstitutionUnities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'institutionUnityListModification',
            (response) => this.load(this.institutionUnity.id)
        );
    }
}
