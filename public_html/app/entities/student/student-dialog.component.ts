import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Student } from './student.model';
import { StudentPopupService } from './student-popup.service';
import { StudentService } from './student.service';
import { MobileApplicationUser, MobileApplicationUserService } from '../mobile-application-user';
import { InstitutionUnity, InstitutionUnityService } from '../institution-unity';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jee-student-dialog',
    templateUrl: './student-dialog.component.html'
})
export class StudentDialogComponent implements OnInit {

    student: Student;
    isSaving: boolean;

    institutionunities: InstitutionUnity[];

    mobileapplicationuser: MobileApplicationUser[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private studentService: StudentService,
        private mobileApplicationUserService: MobileApplicationUserService,
        private institutionUnityService: InstitutionUnityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.institutionUnityService.query()
            .subscribe((res: ResponseWrapper) => { this.institutionunities = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.mobileApplicationUserService.query()
            .subscribe((res: ResponseWrapper) => { this.mobileapplicationuser = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(
                this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(
                this.studentService.create(this.student));
        }
    }

    private subscribeToSaveResponse(result: Observable<Student>) {
        result.subscribe((res: Student) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Student) {
        this.eventManager.broadcast({ name: 'studentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackInstitutionUnityById(index: number, item: InstitutionUnity) {
        return item.id;
    }

    trackMobileApplicationUserById(index: number, item: MobileApplicationUser) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jee-student-popup',
    template: ''
})
export class StudentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.studentPopupService
                    .open(StudentDialogComponent as Component, params['id']);
            } else {
                this.studentPopupService
                    .open(StudentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
