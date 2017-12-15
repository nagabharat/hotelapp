import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PettyCashMySuffix } from './petty-cash-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PettyCashMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/petty-cashes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pettyCash: PettyCashMySuffix): Observable<PettyCashMySuffix> {
        const copy = this.convert(pettyCash);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pettyCash: PettyCashMySuffix): Observable<PettyCashMySuffix> {
        const copy = this.convert(pettyCash);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PettyCashMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to PettyCashMySuffix.
     */
    private convertItemFromServer(json: any): PettyCashMySuffix {
        const entity: PettyCashMySuffix = Object.assign(new PettyCashMySuffix(), json);
        entity.billdate = this.dateUtils
            .convertLocalDateFromServer(json.billdate);
        return entity;
    }

    /**
     * Convert a PettyCashMySuffix to a JSON which can be sent to the server.
     */
    private convert(pettyCash: PettyCashMySuffix): PettyCashMySuffix {
        const copy: PettyCashMySuffix = Object.assign({}, pettyCash);
        copy.billdate = this.dateUtils
            .convertLocalDateToServer(pettyCash.billdate);
        return copy;
    }
}
