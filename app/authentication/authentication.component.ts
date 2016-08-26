import { Component, OnInit, Output }        from '@angular/core';
import { Router }                   from '@angular/router';

import { Authentication }           from './model/authentication';
import { AuthenticationService }    from './authentication.service';

import { User }                     from '../user/model/user';
import { UserService }              from '../user/user.service';

@Component({
    selector: 'authentication',
    templateUrl: 'app/authentication/authentication.component.html',
    //    styleUrls: ['app/vote/detail/vote-detail.component.css']
})
export class AuthenticationComponent implements OnInit {

    authentication: Authentication;
    email : string;
    user: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService) {

        this.authentication = new Authentication();
    }

    ngOnInit() {
        console.log("authentication loaded")
    }

    login() {
        console.log("login: " + this.authentication.email);
        
        this.email = this.authentication.email;

        this.authenticationService.authenticate(this.authentication)
            .subscribe((data: Authentication) => this.authentication = data,
            error => console.log(error),
            () => { console.log("Authentication successful"); this.loadUser(); });
    }

    private loadUser() {

        if (this.authenticationService.isAuthenticated()) {

            this.userService.getSingle(this.email)
                .subscribe((data: User) => this.user = data,
                error => console.log(error),
                () => { console.log("User details loaded"); this.userService.setCurrentUser(this.user) });

            let link = ['./dashboard'];
            this.router.navigate(link);

        } else {
            // Do error stuff
            console.log("No authentication");
        }
    }

    cancel() {
        console.log("cancel")
        this.authentication.email = '';
        this.authentication.password = '';
    }
}