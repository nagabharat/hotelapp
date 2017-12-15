import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BookingMySuffix } from './booking-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BookingMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/bookings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(booking: BookingMySuffix): Observable<BookingMySuffix> {
        const copy = this.convert(booking);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(booking: BookingMySuffix): Observable<BookingMySuffix> {
        const copy = this.convert(booking);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BookingMySuffix> {
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
     * Convert a returned JSON object to BookingMySuffix.
     */
    private convertItemFromServer(json: any): BookingMySuffix {
        const entity: BookingMySuffix = Object.assign(new BookingMySuffix(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        entity.startDate = this.dateUtils
            .convertLocalDateFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertLocalDateFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a BookingMySuffix to a JSON which can be sent to the server.
     */
    private convert(booking: BookingMySuffix): BookingMySuffix {
        const copy: BookingMySuffix = Object.assign({}, booking);
        copy.date = this.dateUtils
            .convertLocalDateToServer(booking.date);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(booking.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(booking.endDate);
        return copy;
    }
}
