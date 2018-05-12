/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LibraryTestModule } from '../../../test.module';
import { RetourMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/retour-my-suffix/retour-my-suffix-detail.component';
import { RetourMySuffixService } from '../../../../../../main/webapp/app/entities/retour-my-suffix/retour-my-suffix.service';
import { RetourMySuffix } from '../../../../../../main/webapp/app/entities/retour-my-suffix/retour-my-suffix.model';

describe('Component Tests', () => {

    describe('RetourMySuffix Management Detail Component', () => {
        let comp: RetourMySuffixDetailComponent;
        let fixture: ComponentFixture<RetourMySuffixDetailComponent>;
        let service: RetourMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [RetourMySuffixDetailComponent],
                providers: [
                    RetourMySuffixService
                ]
            })
            .overrideTemplate(RetourMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RetourMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RetourMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RetourMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.retour).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
