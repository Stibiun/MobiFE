import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EducationalInstitution } from './educational-institution.model';
import { EducationalInstitutionService } from './educational-institution.service';

@Component({
    selector: 'jee-educational-institution-detail',
    templateUrl: './educational-institution-detail.component.html'
})
export class EducationalInstitutionDetailComponent implements OnInit, OnDestroy {

    educationalInstitution: EducationalInstitution;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private educationalInstitutionService: EducationalInstitutionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEducationalInstitutions();
    }

    load(id) {
        this.educationalInstitutionService.find(id).subscribe((educationalInstitution) => {
            this.educationalInstitution = educationalInstitution;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEducationalInstitutions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'educationalInstitutionListModification',
            (response) => this.load(this.educationalInstitution.id)
        );
    }
}
