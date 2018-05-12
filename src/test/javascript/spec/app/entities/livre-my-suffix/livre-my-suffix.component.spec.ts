/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { LivreMySuffixComponent } from '../../../../../../main/webapp/app/entities/livre-my-suffix/livre-my-suffix.component';
import { LivreMySuffixService } from '../../../../../../main/webapp/app/entities/livre-my-suffix/livre-my-suffix.service';
import { LivreMySuffix } from '../../../../../../main/webapp/app/entities/livre-my-suffix/livre-my-suffix.model';

describe('Component Tests', () => {

    describe('LivreMySuffix Management Component', () => {
        let comp: LivreMySuffixComponent;
        let fixture: ComponentFixture<LivreMySuffixComponent>;
        let service: LivreMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [LivreMySuffixComponent],
                providers: [
                    LivreMySuffixService
                ]
            })
            .overrideTemplate(LivreMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LivreMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LivreMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LivreMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.livres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
