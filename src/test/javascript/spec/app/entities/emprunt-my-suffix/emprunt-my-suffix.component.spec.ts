/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { EmpruntMySuffixComponent } from '../../../../../../main/webapp/app/entities/emprunt-my-suffix/emprunt-my-suffix.component';
import { EmpruntMySuffixService } from '../../../../../../main/webapp/app/entities/emprunt-my-suffix/emprunt-my-suffix.service';
import { EmpruntMySuffix } from '../../../../../../main/webapp/app/entities/emprunt-my-suffix/emprunt-my-suffix.model';

describe('Component Tests', () => {

    describe('EmpruntMySuffix Management Component', () => {
        let comp: EmpruntMySuffixComponent;
        let fixture: ComponentFixture<EmpruntMySuffixComponent>;
        let service: EmpruntMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [EmpruntMySuffixComponent],
                providers: [
                    EmpruntMySuffixService
                ]
            })
            .overrideTemplate(EmpruntMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpruntMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpruntMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmpruntMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emprunts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
