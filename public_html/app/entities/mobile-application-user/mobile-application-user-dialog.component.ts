import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MobileApplicationUser } from './mobile-application-user.model';
import { MobileApplicationUserPopupService } from './mobile-application-user-popup.service';
import { MobileApplicationUserService } from './mobile-application-user.service';
import { Student, StudentService } from '../student';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jee-mobile-application-user-dialog',
    templateUrl: './mobile-application-user-dialog.component.html'
})
export class MobileApplicationUserDialogComponent implements OnInit {

    mobileApplicationUser: MobileApplicationUser;
    isSaving: boolean;

    student: Student[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private mobileApplicationUserService: MobileApplicationUserService,
        private studentService: StudentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.studentService.query()
            .subscribe((res: ResponseWrapper) => { this.student = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mobileApplicationUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mobileApplicationUserService.update(this.mobileApplicationUser));
        } else {
            this.subscribeToSaveResponse(
                this.mobileApplicationUserService.create(this.mobileApplicationUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<MobileApplicationUser>) {
        result.subscribe((res: MobileApplicationUser) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MobileApplicationUser) {
        this.eventManager.broadcast({ name: 'mobileApplicationUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackStudentById(index: number, item: Student) {
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
    selector: 'jee-mobile-application-user-popup',
    template: ''
})
export class MobileApplicationUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mobileApplicationUserPopupService: MobileApplicationUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mobileApplicationUserPopupService
                    .open(MobileApplicationUserDialogComponent as Component, params['id']);
            } else {
                this.mobileApplicationUserPopupService
                    .open(MobileApplicationUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
