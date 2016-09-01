import { Component, OnInit }        from '@angular/core';
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
    votes: Vote[] = [];
    error: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private voteService: VoteService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
       if (this.authenticationService.isAuthenticated()) {
            this.voteService.getAll()
                .subscribe((data: Vote[]) => this.votes = data,
                error => console.log(error),
                () => console.log("On dashboard init: Get all votes complete"));

        } else {
            console.error("user not authenticated");
            this.error = "User not authenticated";
        }
    }

    private goToUserDetail(user: User) {
        let link = ['/userDetail', user.email];
        this.router.navigate(link);
    }

    private goToVoteDetail(vote: Vote) {
        let link = ['/voteShowDetail', vote.id];
        this.router.navigate(link);
    }

}