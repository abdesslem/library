import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CommandeMySuffix } from './commande-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CommandeMySuffix>;

@Injectable()
export class CommandeMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/commandes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(commande: CommandeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(commande);
        return this.http.post<CommandeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(commande: CommandeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(commande);
        return this.http.put<CommandeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CommandeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CommandeMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommandeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommandeMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CommandeMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CommandeMySuffix[]>): HttpResponse<CommandeMySuffix[]> {
        const jsonResponse: CommandeMySuffix[] = res.body;
        const body: CommandeMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CommandeMySuffix.
     */
    private convertItemFromServer(commande: CommandeMySuffix): CommandeMySuffix {
        const copy: CommandeMySuffix = Object.assign({}, commande);
        copy.datecommande = this.dateUtils
            .convertLocalDateFromServer(commande.datecommande);
        return copy;
    }

    /**
     * Convert a CommandeMySuffix to a JSON which can be sent to the server.
     */
    private convert(commande: CommandeMySuffix): CommandeMySuffix {
        const copy: CommandeMySuffix = Object.assign({}, commande);
        copy.datecommande = this.dateUtils
            .convertLocalDateToServer(commande.datecommande);
        return copy;
    }
}
