/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { AdministrateurMySuffixComponent } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix/administrateur-my-suffix.component';
import { AdministrateurMySuffixService } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix/administrateur-my-suffix.service';
import { AdministrateurMySuffix } from '../../../../../../main/webapp/app/entities/administrateur-my-suffix/administrateur-my-suffix.model';

describe('Component Tests', () => {

    describe('AdministrateurMySuffix Management Component', () => {
        let comp: AdministrateurMySuffixComponent;
        let fixture: ComponentFixture<AdministrateurMySuffixComponent>;
        let service: AdministrateurMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [AdministrateurMySuffixComponent],
                providers: [
                    AdministrateurMySuffixService
                ]
            })
            .overrideTemplate(AdministrateurMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdministrateurMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdministrateurMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AdministrateurMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.administrateurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
