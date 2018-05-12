import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RetourMySuffix } from './retour-my-suffix.model';
import { RetourMySuffixService } from './retour-my-suffix.service';

@Injectable()
export class RetourMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private retourService: RetourMySuffixService

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
                this.retourService.find(id)
                    .subscribe((retourResponse: HttpResponse<RetourMySuffix>) => {
                        const retour: RetourMySuffix = retourResponse.body;
                        if (retour.dateretour) {
                            retour.dateretour = {
                                year: retour.dateretour.getFullYear(),
                                month: retour.dateretour.getMonth() + 1,
                                day: retour.dateretour.getDate()
                            };
                        }
                        this.ngbModalRef = this.retourModalRef(component, retour);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.retourModalRef(component, new RetourMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    retourModalRef(component: Component, retour: RetourMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.retour = retour;
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
