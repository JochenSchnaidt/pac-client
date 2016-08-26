import { Component, OnInit, Input }    from '@angular/core';
import { Router }                   from '@angular/router';

import { User }                     from '../user/model/user';
import { UserService }              from '../user/user.service';

import { Vote }                     from '../vote/model/vote';
import { VoteService }              from '../vote/vote.service';

import { Authentication }           from '../authentication/model/authentication';
import { AuthenticationService }    from '../authentication/authentication.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    user: User;

    users: User[] = [];
    votes: Vote[] = [];

    constructor(
        private router: Router,
        private userService: UserService,
        private voteService: VoteService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {

        //        this.userService.getAll()
        //            .subscribe((data: User[]) => this.users = data,
        //            error => console.log(error),
        //            () => console.log('On dashboard init: Get all users complete'));

        if (this.authenticationService.isAuthenticated()) {

            this.userService.getSingle(this.authenticationService.getAuthentication().email)
                .subscribe((data: User) => this.user = data,
                error => console.log(error),
                () => { console.log("User details loaded"); this.userService.setCurrentUser(this.user) });

            this.voteService.getAll()
                .subscribe((data: Vote[]) => this.votes = data,
                error => console.log(error),
                () => console.log('On dashboard init: Get all votes complete'));

        } else {

            console.error("user not authenticated");

        }


        //   this.authentication = this.authenticationService.getAuthentication();

        //     console.log("authentication: " + this.authentication.votingAuthenticationToken);
    }

    goToUserDetail(user: User) {
        let link = ['/userDetail', user.email];
        this.router.navigate(link);
    }

    goToVoteDetail(vote: Vote) {
        let link = ['/voteShowDetail', vote.id];
        this.router.navigate(link);
    }

}