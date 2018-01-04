import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EducationalInstitution } from './educational-institution.model';
import { EducationalInstitutionService } from './educational-institution.service';

@Injectable()
export class EducationalInstitutionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private educationalInstitutionService: EducationalInstitutionService

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
                this.educationalInstitutionService.find(id).subscribe((educationalInstitution) => {
                    this.ngbModalRef = this.educationalInstitutionModalRef(component, educationalInstitution);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.educationalInstitutionModalRef(component, new EducationalInstitution());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    educationalInstitutionModalRef(component: Component, educationalInstitution: EducationalInstitution): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.educationalInstitution = educationalInstitution;
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
