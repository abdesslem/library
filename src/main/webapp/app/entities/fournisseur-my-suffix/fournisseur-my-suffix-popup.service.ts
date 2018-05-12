import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FournisseurMySuffix } from './fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';

@Injectable()
export class FournisseurMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private fournisseurService: FournisseurMySuffixService

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
                this.fournisseurService.find(id)
                    .subscribe((fournisseurResponse: HttpResponse<FournisseurMySuffix>) => {
                        const fournisseur: FournisseurMySuffix = fournisseurResponse.body;
                        this.ngbModalRef = this.fournisseurModalRef(component, fournisseur);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fournisseurModalRef(component, new FournisseurMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fournisseurModalRef(component: Component, fournisseur: FournisseurMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fournisseur = fournisseur;
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
