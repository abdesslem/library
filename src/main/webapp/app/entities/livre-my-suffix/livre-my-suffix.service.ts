import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LivreMySuffix } from './livre-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LivreMySuffix>;

@Injectable()
export class LivreMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/livres';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(livre: LivreMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(livre);
        return this.http.post<LivreMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(livre: LivreMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(livre);
        return this.http.put<LivreMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LivreMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LivreMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<LivreMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LivreMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LivreMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LivreMySuffix[]>): HttpResponse<LivreMySuffix[]> {
        const jsonResponse: LivreMySuffix[] = res.body;
        const body: LivreMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LivreMySuffix.
     */
    private convertItemFromServer(livre: LivreMySuffix): LivreMySuffix {
        const copy: LivreMySuffix = Object.assign({}, livre);
        copy.dateedition = this.dateUtils
            .convertLocalDateFromServer(livre.dateedition);
        return copy;
    }

    /**
     * Convert a LivreMySuffix to a JSON which can be sent to the server.
     */
    private convert(livre: LivreMySuffix): LivreMySuffix {
        const copy: LivreMySuffix = Object.assign({}, livre);
        copy.dateedition = this.dateUtils
            .convertLocalDateToServer(livre.dateedition);
        return copy;
    }
}
