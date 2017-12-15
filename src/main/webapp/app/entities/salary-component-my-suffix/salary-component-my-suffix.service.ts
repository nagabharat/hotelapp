import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SalaryComponentMySuffix } from './salary-component-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SalaryComponentMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/salary-components';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(salaryComponent: SalaryComponentMySuffix): Observable<SalaryComponentMySuffix> {
        const copy = this.convert(salaryComponent);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(salaryComponent: SalaryComponentMySuffix): Observable<SalaryComponentMySuffix> {
        const copy = this.convert(salaryComponent);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SalaryComponentMySuffix> {
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
     * Convert a returned JSON object to SalaryComponentMySuffix.
     */
    private convertItemFromServer(json: any): SalaryComponentMySuffix {
        const entity: SalaryComponentMySuffix = Object.assign(new SalaryComponentMySuffix(), json);
        entity.dateOfJoining = this.dateUtils
            .convertLocalDateFromServer(json.dateOfJoining);
        return entity;
    }

    /**
     * Convert a SalaryComponentMySuffix to a JSON which can be sent to the server.
     */
    private convert(salaryComponent: SalaryComponentMySuffix): SalaryComponentMySuffix {
        const copy: SalaryComponentMySuffix = Object.assign({}, salaryComponent);
        copy.dateOfJoining = this.dateUtils
            .convertLocalDateToServer(salaryComponent.dateOfJoining);
        return copy;
    }
}
