/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LibraryTestModule } from '../../../test.module';
import { AbonneMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/abonne-my-suffix/abonne-my-suffix-detail.component';
import { AbonneMySuffixService } from '../../../../../../main/webapp/app/entities/abonne-my-suffix/abonne-my-suffix.service';
import { AbonneMySuffix } from '../../../../../../main/webapp/app/entities/abonne-my-suffix/abonne-my-suffix.model';

describe('Component Tests', () => {

    describe('AbonneMySuffix Management Detail Component', () => {
        let comp: AbonneMySuffixDetailComponent;
        let fixture: ComponentFixture<AbonneMySuffixDetailComponent>;
        let service: AbonneMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [AbonneMySuffixDetailComponent],
                providers: [
                    AbonneMySuffixService
                ]
            })
            .overrideTemplate(AbonneMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbonneMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbonneMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AbonneMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.abonne).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
