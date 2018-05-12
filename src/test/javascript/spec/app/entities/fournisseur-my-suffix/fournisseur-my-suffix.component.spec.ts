/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { FournisseurMySuffixComponent } from '../../../../../../main/webapp/app/entities/fournisseur-my-suffix/fournisseur-my-suffix.component';
import { FournisseurMySuffixService } from '../../../../../../main/webapp/app/entities/fournisseur-my-suffix/fournisseur-my-suffix.service';
import { FournisseurMySuffix } from '../../../../../../main/webapp/app/entities/fournisseur-my-suffix/fournisseur-my-suffix.model';

describe('Component Tests', () => {

    describe('FournisseurMySuffix Management Component', () => {
        let comp: FournisseurMySuffixComponent;
        let fixture: ComponentFixture<FournisseurMySuffixComponent>;
        let service: FournisseurMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [FournisseurMySuffixComponent],
                providers: [
                    FournisseurMySuffixService
                ]
            })
            .overrideTemplate(FournisseurMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FournisseurMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FournisseurMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FournisseurMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fournisseurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
