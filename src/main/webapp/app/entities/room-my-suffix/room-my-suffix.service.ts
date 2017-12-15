import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { RoomMySuffix } from './room-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RoomMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/rooms';

    constructor(private http: Http) { }

    create(room: RoomMySuffix): Observable<RoomMySuffix> {
        const copy = this.convert(room);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(room: RoomMySuffix): Observable<RoomMySuffix> {
        const copy = this.convert(room);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RoomMySuffix> {
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
     * Convert a returned JSON object to RoomMySuffix.
     */
    private convertItemFromServer(json: any): RoomMySuffix {
        const entity: RoomMySuffix = Object.assign(new RoomMySuffix(), json);
        return entity;
    }

    /**
     * Convert a RoomMySuffix to a JSON which can be sent to the server.
     */
    private convert(room: RoomMySuffix): RoomMySuffix {
        const copy: RoomMySuffix = Object.assign({}, room);
        return copy;
    }
}
