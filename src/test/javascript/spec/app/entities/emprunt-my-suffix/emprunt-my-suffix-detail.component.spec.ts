/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LibraryTestModule } from '../../../test.module';
import { EmpruntMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/emprunt-my-suffix/emprunt-my-suffix-detail.component';
import { EmpruntMySuffixService } from '../../../../../../main/webapp/app/entities/emprunt-my-suffix/emprunt-my-suffix.service';
import { EmpruntMySuffix } from '../../../../../../main/webapp/app/entities/emprunt-my-suffix/emprunt-my-suffix.model';

describe('Component Tests', () => {

    describe('EmpruntMySuffix Management Detail Component', () => {
        let comp: EmpruntMySuffixDetailComponent;
        let fixture: ComponentFixture<EmpruntMySuffixDetailComponent>;
        let service: EmpruntMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [EmpruntMySuffixDetailComponent],
                providers: [
                    EmpruntMySuffixService
                ]
            })
            .overrideTemplate(EmpruntMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpruntMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpruntMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EmpruntMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emprunt).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
