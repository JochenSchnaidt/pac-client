import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { Observable }   from 'rxjs/Observable';

import { Vote }         from './model/vote';
import { Voting }       from './model/voting';

import { AuthenticationService }    from '../authentication/authentication.service';

@Injectable()
export class VoteService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private authenticationService: AuthenticationService) {

        this.actionUrl = 'http://localhost:8080/vote/';  // URL to web api

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('X-AUTH-TOKEN', this.authenticationService.getToken());
        
   
    }

    public getAll = (): Observable<Vote[]> => {
        
        let options = new RequestOptions({ headers: this.headers });
        
        return this.http.get(this.actionUrl + 'all/', options)
            .map((response: Response) => <Vote[]>response.json())
            .catch(this.handleError);
    }

    public getSingle = (id: string): Observable<Vote> => {
        return this.http.get(this.actionUrl + id)
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public add = (newVote: Vote): Observable<Vote> => {
        return this.http.post(this.actionUrl, JSON.stringify(newVote), { headers: this.headers })
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public addVoting = (voting: Voting): Observable<Vote> => {
        return this.http.post('http://localhost:8080/voting/', JSON.stringify(voting), { headers: this.headers })
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public updateVoting = (voting: Voting): Observable<Vote> => {
        return this.http.put('http://localhost:8080/voting/', JSON.stringify(voting), { headers: this.headers })
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public update = (updatedVote: Vote): Observable<Vote> => {
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