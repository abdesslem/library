import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CategorieMySuffix } from './categorie-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CategorieMySuffix>;

@Injectable()
export class CategorieMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/categories';

    constructor(private http: HttpClient) { }

    create(categorie: CategorieMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(categorie);
        return this.http.post<CategorieMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(categorie: CategorieMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(categorie);
        return this.http.put<CategorieMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CategorieMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CategorieMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CategorieMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CategorieMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CategorieMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CategorieMySuffix[]>): HttpResponse<CategorieMySuffix[]> {
        const jsonResponse: CategorieMySuffix[] = res.body;
        const body: CategorieMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CategorieMySuffix.
     */
    private convertItemFromServer(categorie: CategorieMySuffix): CategorieMySuffix {
        const copy: CategorieMySuffix = Object.assign({}, categorie);
        return copy;
    }

    /**
     * Convert a CategorieMySuffix to a JSON which can be sent to the server.
     */
    private convert(categorie: CategorieMySuffix): CategorieMySuffix {
        const copy: CategorieMySuffix = Object.assign({}, categorie);
        return copy;
    }
}
