/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { CategorieMySuffixComponent } from '../../../../../../main/webapp/app/entities/categorie-my-suffix/categorie-my-suffix.component';
import { CategorieMySuffixService } from '../../../../../../main/webapp/app/entities/categorie-my-suffix/categorie-my-suffix.service';
import { CategorieMySuffix } from '../../../../../../main/webapp/app/entities/categorie-my-suffix/categorie-my-suffix.model';

describe('Component Tests', () => {

    describe('CategorieMySuffix Management Component', () => {
        let comp: CategorieMySuffixComponent;
        let fixture: ComponentFixture<CategorieMySuffixComponent>;
        let service: CategorieMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [CategorieMySuffixComponent],
                providers: [
                    CategorieMySuffixService
                ]
            })
            .overrideTemplate(CategorieMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategorieMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategorieMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CategorieMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
