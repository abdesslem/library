/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LibraryTestModule } from '../../../test.module';
import { FournisseurMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/fournisseur-my-suffix/fournisseur-my-suffix-detail.component';
import { FournisseurMySuffixService } from '../../../../../../main/webapp/app/entities/fournisseur-my-suffix/fournisseur-my-suffix.service';
import { FournisseurMySuffix } from '../../../../../../main/webapp/app/entities/fournisseur-my-suffix/fournisseur-my-suffix.model';

describe('Component Tests', () => {

    describe('FournisseurMySuffix Management Detail Component', () => {
        let comp: FournisseurMySuffixDetailComponent;
        let fixture: ComponentFixture<FournisseurMySuffixDetailComponent>;
        let service: FournisseurMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [FournisseurMySuffixDetailComponent],
                providers: [
                    FournisseurMySuffixService
                ]
            })
            .overrideTemplate(FournisseurMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FournisseurMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FournisseurMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FournisseurMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fournisseur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
