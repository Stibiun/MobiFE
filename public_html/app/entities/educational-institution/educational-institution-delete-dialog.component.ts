import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EducationalInstitution } from './educational-institution.model';
import { EducationalInstitutionPopupService } from './educational-institution-popup.service';
import { EducationalInstitutionService } from './educational-institution.service';

@Component({
    selector: 'jee-educational-institution-delete-dialog',
    templateUrl: './educational-institution-delete-dialog.component.html'
})
export class EducationalInstitutionDeleteDialogComponent {

    educationalInstitution: EducationalInstitution;

    constructor(
        private educationalInstitutionService: EducationalInstitutionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.educationalInstitutionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'educationalInstitutionListModification',
                content: 'Deleted an educationalInstitution'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jee-educational-institution-delete-popup',
    template: ''
})
export class EducationalInstitutionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationalInstitutionPopupService: EducationalInstitutionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.educationalInstitutionPopupService
                .open(EducationalInstitutionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
