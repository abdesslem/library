import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FournisseurMySuffix } from './fournisseur-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FournisseurMySuffix>;

@Injectable()
export class FournisseurMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/fournisseurs';

    constructor(private http: HttpClient) { }

    create(fournisseur: FournisseurMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(fournisseur);
        return this.http.post<FournisseurMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fournisseur: FournisseurMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(fournisseur);
        return this.http.put<FournisseurMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FournisseurMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FournisseurMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FournisseurMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FournisseurMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FournisseurMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FournisseurMySuffix[]>): HttpResponse<FournisseurMySuffix[]> {
        const jsonResponse: FournisseurMySuffix[] = res.body;
        const body: FournisseurMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FournisseurMySuffix.
     */
    private convertItemFromServer(fournisseur: FournisseurMySuffix): FournisseurMySuffix {
        const copy: FournisseurMySuffix = Object.assign({}, fournisseur);
        return copy;
    }

    /**
     * Convert a FournisseurMySuffix to a JSON which can be sent to the server.
     */
    private convert(fournisseur: FournisseurMySuffix): FournisseurMySuffix {
        const copy: FournisseurMySuffix = Object.assign({}, fournisseur);
        return copy;
    }
}
