import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AbonneMySuffix } from './abonne-my-suffix.model';
import { AbonneMySuffixService } from './abonne-my-suffix.service';

@Injectable()
export class AbonneMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private abonneService: AbonneMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.abonneService.find(id)
                    .subscribe((abonneResponse: HttpResponse<AbonneMySuffix>) => {
                        const abonne: AbonneMySuffix = abonneResponse.body;
                        if (abonne.datenaissance) {
                            abonne.datenaissance = {
                                year: abonne.datenaissance.getFullYear(),
                                month: abonne.datenaissance.getMonth() + 1,
                                day: abonne.datenaissance.getDate()
                            };
                        }
                        this.ngbModalRef = this.abonneModalRef(component, abonne);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.abonneModalRef(component, new AbonneMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    abonneModalRef(component: Component, abonne: AbonneMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.abonne = abonne;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
