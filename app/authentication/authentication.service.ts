import { Injectable }               from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { Observable }               from 'rxjs/Observable';

import { Authentication }           from './model/authentication';

@Injectable()
export class AuthenticationService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.actionUrl = 'http://localhost:8080/auth/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }


    public authenticate = (auth: Authentication): Observable<Authentication> => {
        return this.http.post(this.actionUrl, JSON.stringify(auth), { headers: this.headers })
            .map((response: Response) => <Authentication>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}