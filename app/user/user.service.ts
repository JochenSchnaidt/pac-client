import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';

import { User } from './model/user';

 
@Injectable()
export class UserService {
 
    private actionUrl: string;
    private headers: Headers;
 
    constructor(private http: Http ) {
 
        this.actionUrl =    'http://localhost:8080/user/';  // URL to web api
 
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
 
    public getAll = (): Observable<User[]> => {
        return this.http.get(this.actionUrl + 'all/', { headers: this.headers })
            .map((response: Response) => <User[]>response.json())
            .catch(this.handleError);
    }
 
    public getSingle = (email: string): Observable<User> => {
        return this.http.get(this.actionUrl + email)
            .map((response: Response) => <User>response.json())
            .catch(this.handleError); 
    }
  
    public add = (newUser: User): Observable<User> => {
     
        //   let toAdd = JSON.stringify({ ItemName: itemName });
 
        return this.http.post(this.actionUrl, JSON.stringify(newUser), { headers: this.headers })
            .map((response: Response) => <User>response.json())
            .catch(this.handleError);
    }
 
    public update = (  updatedUser: User): Observable<User> => {
        return this.http.put(this.actionUrl, JSON.stringify(updatedUser), { headers: this.headers })
            .map((response: Response) => <User>response.json())
            .catch(this.handleError);
    }
 
    public delete = (updatedUser: User): Observable<Response> => {
        return this.http.delete(this.actionUrl + updatedUser.id, { headers: this.headers })
            .catch(this.handleError);
    }
 
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}