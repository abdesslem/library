import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmpruntMySuffix } from './emprunt-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmpruntMySuffix>;

@Injectable()
export class EmpruntMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/emprunts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(emprunt: EmpruntMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(emprunt);
        return this.http.post<EmpruntMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(emprunt: EmpruntMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(emprunt);
        return this.http.put<EmpruntMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmpruntMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmpruntMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmpruntMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmpruntMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmpruntMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmpruntMySuffix[]>): HttpResponse<EmpruntMySuffix[]> {
        const jsonResponse: EmpruntMySuffix[] = res.body;
        const body: EmpruntMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmpruntMySuffix.
     */
    private convertItemFromServer(emprunt: EmpruntMySuffix): EmpruntMySuffix {
        const copy: EmpruntMySuffix = Object.assign({}, emprunt);
        copy.dateemprunt = this.dateUtils
            .convertLocalDateFromServer(emprunt.dateemprunt);
        copy.dateretourlimite = this.dateUtils
            .convertLocalDateFromServer(emprunt.dateretourlimite);
        return copy;
    }

    /**
     * Convert a EmpruntMySuffix to a JSON which can be sent to the server.
     */
    private convert(emprunt: EmpruntMySuffix): EmpruntMySuffix {
        const copy: EmpruntMySuffix = Object.assign({}, emprunt);
        copy.dateemprunt = this.dateUtils
            .convertLocalDateToServer(emprunt.dateemprunt);
        copy.dateretourlimite = this.dateUtils
            .convertLocalDateToServer(emprunt.dateretourlimite);
        return copy;
    }
}
