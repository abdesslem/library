/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { RetourMySuffixComponent } from '../../../../../../main/webapp/app/entities/retour-my-suffix/retour-my-suffix.component';
import { RetourMySuffixService } from '../../../../../../main/webapp/app/entities/retour-my-suffix/retour-my-suffix.service';
import { RetourMySuffix } from '../../../../../../main/webapp/app/entities/retour-my-suffix/retour-my-suffix.model';

describe('Component Tests', () => {

    describe('RetourMySuffix Management Component', () => {
        let comp: RetourMySuffixComponent;
        let fixture: ComponentFixture<RetourMySuffixComponent>;
        let service: RetourMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [RetourMySuffixComponent],
                providers: [
                    RetourMySuffixService
                ]
            })
            .overrideTemplate(RetourMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RetourMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetourMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RetourMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.retours[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
