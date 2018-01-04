/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { WebappTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EducationalInstitutionDetailComponent } from '../../../../../../main/webapp/app/entities/educational-institution/educational-institution-detail.component';
import { EducationalInstitutionService } from '../../../../../../main/webapp/app/entities/educational-institution/educational-institution.service';
import { EducationalInstitution } from '../../../../../../main/webapp/app/entities/educational-institution/educational-institution.model';

describe('Component Tests', () => {

    describe('EducationalInstitution Management Detail Component', () => {
        let comp: EducationalInstitutionDetailComponent;
        let fixture: ComponentFixture<EducationalInstitutionDetailComponent>;
        let service: EducationalInstitutionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [WebappTestModule],
                declarations: [EducationalInstitutionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EducationalInstitutionService,
                    JhiEventManager
                ]
            }).overrideTemplate(EducationalInstitutionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationalInstitutionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationalInstitutionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EducationalInstitution(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.educationalInstitution).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
