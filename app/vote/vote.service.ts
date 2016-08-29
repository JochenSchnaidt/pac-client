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
    private options: RequestOptions;

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.actionUrl = 'http://localhost:8080/';  // URL to web api
    }

    private prepareHeader() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('X-AUTH-TOKEN', this.authenticationService.getToken());
        this.options = new RequestOptions({ headers: this.headers });
    }

    public getAll = (): Observable<Vote[]> => {
        this.prepareHeader();
        return this.http.get(this.actionUrl + 'vote/all/', this.options)
            .map((response: Response) => <Vote[]>response.json())
            .catch(this.handleError);
    }

    public getSingle = (id: string): Observable<Vote> => {
        this.prepareHeader();
        return this.http.get(this.actionUrl + 'vote/' + id, this.options)
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public add = (newVote: Vote): Observable<Vote> => {
        this.prepareHeader();
        return this.http.post(this.actionUrl + 'vote/', JSON.stringify(newVote), this.options)
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public addVoting = (voting: Voting): Observable<Vote> => {
        this.prepareHeader();
        return this.http.post(this.actionUrl + 'voting/', JSON.stringify(voting), this.options)
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public updateVoting = (voting: Voting): Observable<Vote> => {
        this.prepareHeader();
        return this.http.put(this.actionUrl + 'voting/', JSON.stringify(voting), this.options)
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public update = (updatedVote: Vote): Observable<Vote> => {
        this.prepareHeader();
        return this.http.put(this.actionUrl + 'vote/', JSON.stringify(updatedVote), this.options)
            .map((response: Response) => <Vote>response.json())
            .catch(this.handleError);
    }

    public delete = (updatedVote: Vote): Observable<Response> => {
        this.prepareHeader();
        return this.http.delete(this.actionUrl + 'vote/' + updatedVote.id, this.options)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}