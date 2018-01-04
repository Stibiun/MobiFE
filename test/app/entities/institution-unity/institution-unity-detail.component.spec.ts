/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { WebappTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InstitutionUnityDetailComponent } from '../../../../../../main/webapp/app/entities/institution-unity/institution-unity-detail.component';
import { InstitutionUnityService } from '../../../../../../main/webapp/app/entities/institution-unity/institution-unity.service';
import { InstitutionUnity } from '../../../../../../main/webapp/app/entities/institution-unity/institution-unity.model';

describe('Component Tests', () => {

    describe('InstitutionUnity Management Detail Component', () => {
        let comp: InstitutionUnityDetailComponent;
        let fixture: ComponentFixture<InstitutionUnityDetailComponent>;
        let service: InstitutionUnityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WebappTestModule],
                declarations: [InstitutionUnityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InstitutionUnityService,
                    JhiEventManager
                ]
            }).overrideTemplate(InstitutionUnityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InstitutionUnityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstitutionUnityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new InstitutionUnity(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.institutionUnity).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
