import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EducationalInstitution } from './educational-institution.model';
import { EducationalInstitutionPopupService } from './educational-institution-popup.service';
import { EducationalInstitutionService } from './educational-institution.service';

@Component({
    selector: 'jee-educational-institution-dialog',
    templateUrl: './educational-institution-dialog.component.html'
})
export class EducationalInstitutionDialogComponent implements OnInit {

    educationalInstitution: EducationalInstitution;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private educationalInstitutionService: EducationalInstitutionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.educationalInstitution.id !== undefined) {
            this.subscribeToSaveResponse(
                this.educationalInstitutionService.update(this.educationalInstitution));
        } else {
            this.subscribeToSaveResponse(
                this.educationalInstitutionService.create(this.educationalInstitution));
        }
    }

    private subscribeToSaveResponse(result: Observable<EducationalInstitution>) {
        result.subscribe((res: EducationalInstitution) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EducationalInstitution) {
        this.eventManager.broadcast({ name: 'educationalInstitutionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jee-educational-institution-popup',
    template: ''
})
export class EducationalInstitutionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationalInstitutionPopupService: EducationalInstitutionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.educationalInstitutionPopupService
                    .open(EducationalInstitutionDialogComponent as Component, params['id']);
            } else {
                this.educationalInstitutionPopupService
                    .open(EducationalInstitutionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
