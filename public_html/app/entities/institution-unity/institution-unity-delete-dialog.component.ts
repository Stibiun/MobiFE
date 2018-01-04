import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InstitutionUnity } from './institution-unity.model';
import { InstitutionUnityPopupService } from './institution-unity-popup.service';
import { InstitutionUnityService } from './institution-unity.service';

@Component({
    selector: 'jee-institution-unity-delete-dialog',
    templateUrl: './institution-unity-delete-dialog.component.html'
})
export class InstitutionUnityDeleteDialogComponent {

    institutionUnity: InstitutionUnity;

    constructor(
        private institutionUnityService: InstitutionUnityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.institutionUnityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'institutionUnityListModification',
                content: 'Deleted an institutionUnity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jee-institution-unity-delete-popup',
    template: ''
})
export class InstitutionUnityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private institutionUnityPopupService: InstitutionUnityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.institutionUnityPopupService
                .open(InstitutionUnityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
