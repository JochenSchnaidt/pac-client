import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';

import { Vote } from './model/vote';

 
@Injectable()
export class VoteService {
 
    private actionUrl: string;
    private headers: Headers;
 
    constructor(private http: Http ) {
 
        this.actionUrl =    'http://localhost:8080/vote/';  // URL to web api
 
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
 
    public getAll = (): Observable<Vote[]> => {
        return this.http.get(this.actionUrl + 'all/', { headers: this.headers })
            .map((response: Response) => <Vote[]>response.json())
            .catch(this.handleError);
    }
 
    public getSingle = (id: string): Observable<Vote> => {
        return this.http.get(this.actionUrl + id)
            .map((response: Response) =>  <Vote>response.json())
            .catch(this.handleError); 
    }
  
    public add = (newVote: Vote): Observable<Vote> => {
     
        //   let toAdd = JSON.stringify({ ItemName: itemName });
 
        return this.http.post(this.actionUrl, JSON.stringify(newVote), { headers: this.headers })
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }
 
    public update = (  updatedVote: Vote): Observable<Vote> => {
        return this.http.put(this.actionUrl, JSON.stringify(updatedVote), { headers: this.headers })
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }
 
    public delete = (updatedVote: Vote): Observable<Response> => {
        return this.http.delete(this.actionUrl + updatedVote.id, { headers: this.headers })
            .catch(this.handleError);
    }
 
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}