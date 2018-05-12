/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LibraryTestModule } from '../../../test.module';
import { AdministrateurMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix/administrateur-my-suffix-detail.component';
import { AdministrateurMySuffixService } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix/administrateur-my-suffix.service';
import { AdministrateurMySuffix } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix/administrateur-my-suffix.model';

describe('Component Tests', () => {

    describe('AdministrateurMySuffix Management Detail Component', () => {
        let comp: AdministrateurMySuffixDetailComponent;
        let fixture: ComponentFixture<AdministrateurMySuffixDetailComponent>;
        let service: AdministrateurMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [AdministrateurMySuffixDetailComponent],
                providers: [
                    AdministrateurMySuffixService
                ]
            })
            .overrideTemplate(AdministrateurMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdministrateurMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdministrateurMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AdministrateurMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.administrateur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
