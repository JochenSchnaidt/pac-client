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

    private authentication: Authentication;
    private authenticated = false;
    private token: string;

    constructor(private http: Http) {
        this.actionUrl = 'http://localhost:8080/auth/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public authenticate = (auth: Authentication): Observable<Authentication> => {
        return this.http.post(this.actionUrl, JSON.stringify(auth), { headers: this.headers })
            .map((response: Response) => {
                console.log("xauthtoken: " + response.headers.get('X-AUTH-TOKEN'));
                this.storeAuthentication(response.headers.get('X-AUTH-TOKEN'));
            })
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        this.authentication = null;
        this.authenticated = false;
        this.token = null;
        return Observable.throw(error.json().error || 'Server error');
    }

    private storeAuthentication(token: string) {
        this.authenticated = true;
        this.token = token;
    }

    public isAuthenticated() {
        return this.authenticated;
    }
    
       public getToken() {
        return this.token;
    }

}