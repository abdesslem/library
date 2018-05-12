import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LivreMySuffix } from './livre-my-suffix.model';
import { LivreMySuffixService } from './livre-my-suffix.service';

@Injectable()
export class LivreMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private livreService: LivreMySuffixService

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
                this.livreService.find(id)
                    .subscribe((livreResponse: HttpResponse<LivreMySuffix>) => {
                        const livre: LivreMySuffix = livreResponse.body;
                        if (livre.dateedition) {
                            livre.dateedition = {
                                year: livre.dateedition.getFullYear(),
                                month: livre.dateedition.getMonth() + 1,
                                day: livre.dateedition.getDate()
                            };
                        }
                        this.ngbModalRef = this.livreModalRef(component, livre);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.livreModalRef(component, new LivreMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    livreModalRef(component: Component, livre: LivreMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.livre = livre;
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
