import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CommandeMySuffix } from './commande-my-suffix.model';
import { CommandeMySuffixService } from './commande-my-suffix.service';

@Injectable()
export class CommandeMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private commandeService: CommandeMySuffixService

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
                this.commandeService.find(id)
                    .subscribe((commandeResponse: HttpResponse<CommandeMySuffix>) => {
                        const commande: CommandeMySuffix = commandeResponse.body;
                        if (commande.datecommande) {
                            commande.datecommande = {
                                year: commande.datecommande.getFullYear(),
                                month: commande.datecommande.getMonth() + 1,
                                day: commande.datecommande.getDate()
                            };
                        }
                        this.ngbModalRef = this.commandeModalRef(component, commande);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.commandeModalRef(component, new CommandeMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    commandeModalRef(component: Component, commande: CommandeMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.commande = commande;
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
