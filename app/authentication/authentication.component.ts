import { Component, EventEmitter, Output }  from '@angular/core';
import { ActivatedRoute }                   from '@angular/router';

import { Authentication }           from './model/authentication';
import { AuthenticationService }    from './authentication.service';

@Component({
    selector: 'authentication',
    templateUrl: 'app/authentication/authentication.component.html',
    //    styleUrls: ['app/vote/detail/vote-detail.component.css']
})
export class AuthenticationComponent {

    authentication: Authentication;

     constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute) {

        this.authentication = new Authentication();
    }

 
    login() {
        console.log('login: ' + this.authentication.email + '; ' + this.authentication.password);

        this.authenticationService.authenticate(this.authentication)
            .subscribe((data: Authentication) => this.authentication = data,
            error => console.log(error),
            () => console.log('Authentication successful'));

        console.log("token from server: " + this.authentication.votingAuthenticationToken);
    }

    cancel() {
        console.log('cancel')

        this.authentication.email = '';
        this.authentication.password = '';
 }
}