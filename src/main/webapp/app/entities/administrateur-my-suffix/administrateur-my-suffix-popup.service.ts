import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AdministrateurMySuffix } from './administrateur-my-suffix.model';
import { AdministrateurMySuffixService } from './administrateur-my-suffix.service';

@Injectable()
export class AdministrateurMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private administrateurService: AdministrateurMySuffixService

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
                this.administrateurService.find(id)
                    .subscribe((administrateurResponse: HttpResponse<AdministrateurMySuffix>) => {
                        const administrateur: AdministrateurMySuffix = administrateurResponse.body;
                        this.ngbModalRef = this.administrateurModalRef(component, administrateur);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.administrateurModalRef(component, new AdministrateurMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    administrateurModalRef(component: Component, administrateur: AdministrateurMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.administrateur = administrateur;
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
