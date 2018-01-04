import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InstitutionUnity } from './institution-unity.model';
import { InstitutionUnityPopupService } from './institution-unity-popup.service';
import { InstitutionUnityService } from './institution-unity.service';
import { EducationalInstitution, EducationalInstitutionService } from '../educational-institution';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jee-institution-unity-dialog',
    templateUrl: './institution-unity-dialog.component.html'
})
export class InstitutionUnityDialogComponent implements OnInit {

    institutionUnity: InstitutionUnity;
    isSaving: boolean;

    educationalinstitutions: EducationalInstitution[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private institutionUnityService: InstitutionUnityService,
        private educationalInstitutionService: EducationalInstitutionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.educationalInstitutionService.query()
            .subscribe((res: ResponseWrapper) => { this.educationalinstitutions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.institutionUnity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.institutionUnityService.update(this.institutionUnity));
        } else {
            this.subscribeToSaveResponse(
                this.institutionUnityService.create(this.institutionUnity));
        }
    }

    private subscribeToSaveResponse(result: Observable<InstitutionUnity>) {
        result.subscribe((res: InstitutionUnity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: InstitutionUnity) {
        this.eventManager.broadcast({ name: 'institutionUnityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackEducationalInstitutionById(index: number, item: EducationalInstitution) {
        return item.id;
    }
}

@Component({
    selector: 'jee-institution-unity-popup',
    template: ''
})
export class InstitutionUnityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private institutionUnityPopupService: InstitutionUnityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.institutionUnityPopupService
                    .open(InstitutionUnityDialogComponent as Component, params['id']);
            } else {
                this.institutionUnityPopupService
                    .open(InstitutionUnityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
