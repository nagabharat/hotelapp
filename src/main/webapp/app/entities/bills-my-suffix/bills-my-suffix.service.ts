import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BillsMySuffix } from './bills-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BillsMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/bills';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(bills: BillsMySuffix): Observable<BillsMySuffix> {
        const copy = this.convert(bills);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bills: BillsMySuffix): Observable<BillsMySuffix> {
        const copy = this.convert(bills);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BillsMySuffix> {
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
     * Convert a returned JSON object to BillsMySuffix.
     */
    private convertItemFromServer(json: any): BillsMySuffix {
        const entity: BillsMySuffix = Object.assign(new BillsMySuffix(), json);
        entity.billdate = this.dateUtils
            .convertLocalDateFromServer(json.billdate);
        return entity;
    }

    /**
     * Convert a BillsMySuffix to a JSON which can be sent to the server.
     */
    private convert(bills: BillsMySuffix): BillsMySuffix {
        const copy: BillsMySuffix = Object.assign({}, bills);
        copy.billdate = this.dateUtils
            .convertLocalDateToServer(bills.billdate);
        return copy;
    }
}
