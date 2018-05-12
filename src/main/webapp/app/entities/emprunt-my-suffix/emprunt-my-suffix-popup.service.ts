import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EmpruntMySuffix } from './emprunt-my-suffix.model';
import { EmpruntMySuffixService } from './emprunt-my-suffix.service';

@Injectable()
export class EmpruntMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private empruntService: EmpruntMySuffixService

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
                this.empruntService.find(id)
                    .subscribe((empruntResponse: HttpResponse<EmpruntMySuffix>) => {
                        const emprunt: EmpruntMySuffix = empruntResponse.body;
                        if (emprunt.dateemprunt) {
                            emprunt.dateemprunt = {
                                year: emprunt.dateemprunt.getFullYear(),
                                month: emprunt.dateemprunt.getMonth() + 1,
                                day: emprunt.dateemprunt.getDate()
                            };
                        }
                        if (emprunt.dateretourlimite) {
                            emprunt.dateretourlimite = {
                                year: emprunt.dateretourlimite.getFullYear(),
                                month: emprunt.dateretourlimite.getMonth() + 1,
                                day: emprunt.dateretourlimite.getDate()
                            };
                        }
                        this.ngbModalRef = this.empruntModalRef(component, emprunt);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.empruntModalRef(component, new EmpruntMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    empruntModalRef(component: Component, emprunt: EmpruntMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emprunt = emprunt;
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
