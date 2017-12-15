import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { MonthOfYearMySuffix } from './month-of-year-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MonthOfYearMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/month-of-years';

    constructor(private http: Http) { }

    create(monthOfYear: MonthOfYearMySuffix): Observable<MonthOfYearMySuffix> {
        const copy = this.convert(monthOfYear);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(monthOfYear: MonthOfYearMySuffix): Observable<MonthOfYearMySuffix> {
        const copy = this.convert(monthOfYear);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MonthOfYearMySuffix> {
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
     * Convert a returned JSON object to MonthOfYearMySuffix.
     */
    private convertItemFromServer(json: any): MonthOfYearMySuffix {
        const entity: MonthOfYearMySuffix = Object.assign(new MonthOfYearMySuffix(), json);
        return entity;
    }

    /**
     * Convert a MonthOfYearMySuffix to a JSON which can be sent to the server.
     */
    private convert(monthOfYear: MonthOfYearMySuffix): MonthOfYearMySuffix {
        const copy: MonthOfYearMySuffix = Object.assign({}, monthOfYear);
        return copy;
    }
}
