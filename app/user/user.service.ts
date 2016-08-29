import { Injectable }                             from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { Observable }               from 'rxjs/Observable';

import { User }                     from './model/user';
import { AuthenticationService }    from '../authentication/authentication.service';

@Injectable()
export class UserService {

    private currentUser: User;

    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http,
        private authenticationService: AuthenticationService) {
        this.actionUrl = 'http://localhost:8080/';  // URL to web api
    }

    private prepareHeader() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('X-AUTH-TOKEN', this.authenticationService.getToken());
        this.options = new RequestOptions({ headers: this.headers });
    }


    public getAll = (): Observable<User[]> => {
        this.prepareHeader();
        return this.http.get(this.actionUrl + 'user/all/', this.options)
            .map((response: Response) => <User[]>response.json())
            .catch(this.handleError);
    }

    public getSingle = (email: string): Observable<User> => {
        this.prepareHeader();
        return this.http.get(this.actionUrl + 'user/' + email, this.options)
            .map((response: Response) => <User>response.json())
            .catch(this.handleError);
    }

    public add = (newUser: User): Observable<User> => {
        this.prepareHeader();
        return this.http.post(this.actionUrl + 'user/', JSON.stringify(newUser), this.options)
            .map((response: Response) => <User>response.json())
            .catch(this.handleError);
    }

    public update = (updatedUser: User): Observable<User> => {
        this.prepareHeader();
        return this.http.put(this.actionUrl + 'user/', JSON.stringify(updatedUser), this.options)
            .map((response: Response) => <User>response.json())
            .catch(this.handleError);
    }

    public delete = (updatedUser: User): Observable<Response> => {
        this.prepareHeader();
        return this.http.delete(this.actionUrl + 'user/' + updatedUser.id, this.options)
            .catch(this.handleError);
    }

    public setCurrentUser(user: User) {
        this.currentUser = user;
    }

    public getCurrentUser() {
        return this.currentUser;
    }

    public updateCurrentUser() {
        this.getSingle(this.currentUser.email)
            .subscribe((data: User) => this.currentUser = data,
            error => console.log(error),
            () => console.log("User details updated"));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}