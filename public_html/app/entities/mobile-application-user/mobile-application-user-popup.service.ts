import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MobileApplicationUser } from './mobile-application-user.model';
import { MobileApplicationUserService } from './mobile-application-user.service';

@Injectable()
export class MobileApplicationUserPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private mobileApplicationUserService: MobileApplicationUserService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.mobileApplicationUserService.find(id).subscribe((mobileApplicationUser) => {
                    this.ngbModalRef = this.mobileApplicationUserModalRef(component, mobileApplicationUser);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.mobileApplicationUserModalRef(component, new MobileApplicationUser());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mobileApplicationUserModalRef(component: Component, mobileApplicationUser: MobileApplicationUser): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mobileApplicationUser = mobileApplicationUser;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
