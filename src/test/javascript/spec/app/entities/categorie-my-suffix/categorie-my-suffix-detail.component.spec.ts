/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LibraryTestModule } from '../../../test.module';
import { CategorieMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/categorie-my-suffix/categorie-my-suffix-detail.component';
import { CategorieMySuffixService } from '../../../../../../main/webapp/app/entities/categorie-my-suffix/categorie-my-suffix.service';
import { CategorieMySuffix } from '../../../../../../main/webapp/app/entities/categorie-my-suffix/categorie-my-suffix.model';

describe('Component Tests', () => {

    describe('CategorieMySuffix Management Detail Component', () => {
        let comp: CategorieMySuffixDetailComponent;
        let fixture: ComponentFixture<CategorieMySuffixDetailComponent>;
        let service: CategorieMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [CategorieMySuffixDetailComponent],
                providers: [
                    CategorieMySuffixService
                ]
            })
            .overrideTemplate(CategorieMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategorieMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategorieMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CategorieMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.categorie).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
