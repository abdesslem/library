import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AdministrateurMySuffix } from './administrateur-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AdministrateurMySuffix>;

@Injectable()
export class AdministrateurMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/administrateurs';

    constructor(private http: HttpClient) { }

    create(administrateur: AdministrateurMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(administrateur);
        return this.http.post<AdministrateurMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(administrateur: AdministrateurMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(administrateur);
        return this.http.put<AdministrateurMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AdministrateurMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AdministrateurMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AdministrateurMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AdministrateurMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AdministrateurMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AdministrateurMySuffix[]>): HttpResponse<AdministrateurMySuffix[]> {
        const jsonResponse: AdministrateurMySuffix[] = res.body;
        const body: AdministrateurMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AdministrateurMySuffix.
     */
    private convertItemFromServer(administrateur: AdministrateurMySuffix): AdministrateurMySuffix {
        const copy: AdministrateurMySuffix = Object.assign({}, administrateur);
        return copy;
    }

    /**
     * Convert a AdministrateurMySuffix to a JSON which can be sent to the server.
     */
    private convert(administrateur: AdministrateurMySuffix): AdministrateurMySuffix {
        const copy: AdministrateurMySuffix = Object.assign({}, administrateur);
        return copy;
    }
}
