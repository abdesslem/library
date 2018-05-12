import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RetourMySuffix } from './retour-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RetourMySuffix>;

@Injectable()
export class RetourMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/retours';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(retour: RetourMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(retour);
        return this.http.post<RetourMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(retour: RetourMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(retour);
        return this.http.put<RetourMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RetourMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RetourMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RetourMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RetourMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RetourMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RetourMySuffix[]>): HttpResponse<RetourMySuffix[]> {
        const jsonResponse: RetourMySuffix[] = res.body;
        const body: RetourMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RetourMySuffix.
     */
    private convertItemFromServer(retour: RetourMySuffix): RetourMySuffix {
        const copy: RetourMySuffix = Object.assign({}, retour);
        copy.dateretour = this.dateUtils
            .convertLocalDateFromServer(retour.dateretour);
        return copy;
    }

    /**
     * Convert a RetourMySuffix to a JSON which can be sent to the server.
     */
    private convert(retour: RetourMySuffix): RetourMySuffix {
        const copy: RetourMySuffix = Object.assign({}, retour);
        copy.dateretour = this.dateUtils
            .convertLocalDateToServer(retour.dateretour);
        return copy;
    }
}
