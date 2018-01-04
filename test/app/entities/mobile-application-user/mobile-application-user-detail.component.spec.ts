/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { WebappTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MobileApplicationUserDetailComponent } from '../../../../../../main/webapp/app/entities/mobile-application-user/mobile-application-user-detail.component';
import { MobileApplicationUserService } from '../../../../../../main/webapp/app/entities/mobile-application-user/mobile-application-user.service';
import { MobileApplicationUser } from '../../../../../../main/webapp/app/entities/mobile-application-user/mobile-application-user.model';

describe('Component Tests', () => {

    describe('MobileApplicationUser Management Detail Component', () => {
        let comp: MobileApplicationUserDetailComponent;
        let fixture: ComponentFixture<MobileApplicationUserDetailComponent>;
        let service: MobileApplicationUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WebappTestModule],
                declarations: [MobileApplicationUserDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MobileApplicationUserService,
                    JhiEventManager
                ]
            }).overrideTemplate(MobileApplicationUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MobileApplicationUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MobileApplicationUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MobileApplicationUser(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mobileApplicationUser).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
