import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { Vote }         from '../model/vote';
import { Voting }       from '../model/voting';
import { VoteService }  from '../vote.service';
import { UserService }  from './../../user/user.service';

@Component({
    selector: 'my-vote-participate',
    templateUrl: 'app/vote/participate/vote-participate.component.html',
    styleUrls: ['app/vote/participate/vote-participate.component.css']
})
export class VoteParticipateComponent implements OnInit, OnDestroy {
    vote : Vote;
    error: any;
    sub: any;

    navigated = false; // true if navigated here

    constructor(
        private voteService: VoteService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {

                this.navigated = true;

                this.voteService
                    .getSingle(params['id'])
                    .subscribe((data: Vote) => this.vote = data,
                    error => console.log(error),
                    () => console.log("Get vote details completed"));

            } else {
                this.navigated = false;
                this.vote = new Vote();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    addVoting(votedOption: string) {

        console.log("selected option: " + votedOption);

        let updatedVote: Vote;

        let voting = new Voting();
        voting.voteId = this.vote.id;
        voting.userId = this.userService.getCurrentUser().id;
        voting.optionId = votedOption;

        if (this.userHasAlreadyVoted) {
            this.voteService
                .updateVoting(voting)
                .subscribe((data: Vote) => updatedVote = data,
                error => console.log(error),
                () => {
                    this.userService.updateCurrentUser();
                    this.showStanding()
                });
        } else {
            this.voteService
                .addVoting(voting)
                .subscribe((data: Vote) => updatedVote = data,
                error => console.log(error),
                () => {
                    this.userService.updateCurrentUser();
                    this.showStanding()
                });
        }
    }

    private userHasAlreadyVoted() {

        for (let selection of this.userService.getCurrentUser().selections) {
            if (selection.voteId == this.vote.id) {
                return true;
            }
        }
        return false;
    }

    private showStanding() {
        console.log("showStanding called");

        let link = ['/voteShowDetail', this.vote.id];
        this.router.navigate(link);
    }

    private goBack(savedVote: Vote = null) {
        if (this.navigated) { window.history.back(); }
    }

}