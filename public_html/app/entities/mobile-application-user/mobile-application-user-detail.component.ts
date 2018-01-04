import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MobileApplicationUser } from './mobile-application-user.model';
import { MobileApplicationUserService } from './mobile-application-user.service';

@Component({
    selector: 'jee-mobile-application-user-detail',
    templateUrl: './mobile-application-user-detail.component.html'
})
export class MobileApplicationUserDetailComponent implements OnInit, OnDestroy {

    mobileApplicationUser: MobileApplicationUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mobileApplicationUserService: MobileApplicationUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMobileApplicationUsers();
    }

    load(id) {
        this.mobileApplicationUserService.find(id).subscribe((mobileApplicationUser) => {
            this.mobileApplicationUser = mobileApplicationUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMobileApplicationUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mobileApplicationUserListModification',
            (response) => this.load(this.mobileApplicationUser.id)
        );
    }
}
