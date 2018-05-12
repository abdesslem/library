/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { AbonneMySuffixComponent } from '../../../../../../main/webapp/app/entities/abonne-my-suffix/abonne-my-suffix.component';
import { AbonneMySuffixService } from '../../../../../../main/webapp/app/entities/abonne-my-suffix/abonne-my-suffix.service';
import { AbonneMySuffix } from '../../../../../../main/webapp/app/entities/abonne-my-suffix/abonne-my-suffix.model';

describe('Component Tests', () => {

    describe('AbonneMySuffix Management Component', () => {
        let comp: AbonneMySuffixComponent;
        let fixture: ComponentFixture<AbonneMySuffixComponent>;
        let service: AbonneMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [AbonneMySuffixComponent],
                providers: [
                    AbonneMySuffixService
                ]
            })
            .overrideTemplate(AbonneMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbonneMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbonneMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AbonneMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.abonnes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
