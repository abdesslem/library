import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AbonneMySuffix } from './abonne-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AbonneMySuffix>;

@Injectable()
export class AbonneMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/abonnes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(abonne: AbonneMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(abonne);
        return this.http.post<AbonneMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(abonne: AbonneMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(abonne);
        return this.http.put<AbonneMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AbonneMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AbonneMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AbonneMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AbonneMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AbonneMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AbonneMySuffix[]>): HttpResponse<AbonneMySuffix[]> {
        const jsonResponse: AbonneMySuffix[] = res.body;
        const body: AbonneMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AbonneMySuffix.
     */
    private convertItemFromServer(abonne: AbonneMySuffix): AbonneMySuffix {
        const copy: AbonneMySuffix = Object.assign({}, abonne);
        copy.datenaissance = this.dateUtils
            .convertLocalDateFromServer(abonne.datenaissance);
        return copy;
    }

    /**
     * Convert a AbonneMySuffix to a JSON which can be sent to the server.
     */
    private convert(abonne: AbonneMySuffix): AbonneMySuffix {
        const copy: AbonneMySuffix = Object.assign({}, abonne);
        copy.datenaissance = this.dateUtils
            .convertLocalDateToServer(abonne.datenaissance);
        return copy;
    }
}
