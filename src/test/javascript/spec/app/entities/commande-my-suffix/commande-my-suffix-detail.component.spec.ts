/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LibraryTestModule } from '../../../test.module';
import { CommandeMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix-detail.component';
import { CommandeMySuffixService } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix.service';
import { CommandeMySuffix } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix.model';

describe('Component Tests', () => {

    describe('CommandeMySuffix Management Detail Component', () => {
        let comp: CommandeMySuffixDetailComponent;
        let fixture: ComponentFixture<CommandeMySuffixDetailComponent>;
        let service: CommandeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [CommandeMySuffixDetailComponent],
                providers: [
                    CommandeMySuffixService
                ]
            })
            .overrideTemplate(CommandeMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommandeMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CommandeMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.commande).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
