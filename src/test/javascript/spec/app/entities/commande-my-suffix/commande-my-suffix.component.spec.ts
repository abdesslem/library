/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LibraryTestModule } from '../../../test.module';
import { CommandeMySuffixComponent } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix.component';
import { CommandeMySuffixService } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix.service';
import { CommandeMySuffix } from '../../../../../../main/webapp/app/entities/commande-my-suffix/commande-my-suffix.model';

describe('Component Tests', () => {

    describe('CommandeMySuffix Management Component', () => {
        let comp: CommandeMySuffixComponent;
        let fixture: ComponentFixture<CommandeMySuffixComponent>;
        let service: CommandeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibraryTestModule],
                declarations: [CommandeMySuffixComponent],
                providers: [
                    CommandeMySuffixService
                ]
            })
            .overrideTemplate(CommandeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommandeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommandeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CommandeMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.commandes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
