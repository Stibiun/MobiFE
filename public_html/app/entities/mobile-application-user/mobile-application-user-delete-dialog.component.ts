import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MobileApplicationUser } from './mobile-application-user.model';
import { MobileApplicationUserPopupService } from './mobile-application-user-popup.service';
import { MobileApplicationUserService } from './mobile-application-user.service';

@Component({
    selector: 'jee-mobile-application-user-delete-dialog',
    templateUrl: './mobile-application-user-delete-dialog.component.html'
})
export class MobileApplicationUserDeleteDialogComponent {

    mobileApplicationUser: MobileApplicationUser;

    constructor(
        private mobileApplicationUserService: MobileApplicationUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mobileApplicationUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mobileApplicationUserListModification',
                content: 'Deleted an mobileApplicationUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jee-mobile-application-user-delete-popup',
    template: ''
})
export class MobileApplicationUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mobileApplicationUserPopupService: MobileApplicationUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mobileApplicationUserPopupService
                .open(MobileApplicationUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
