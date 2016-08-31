import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Response }                     from '@angular/http';

import { Vote }             from '../model/vote';
import { Option }           from '../model/option';
import { VoteService }      from '../vote.service';
import { UserService }      from './../../user/user.service';

@Component({
    selector: 'my-vote-detail',
    templateUrl: 'app/vote/show/vote-show-detail.component.html',
    styleUrls: ['app/vote/show/vote-show-detail.component.css']
})
export class VoteShowDetailComponent implements OnInit, OnDestroy {

    private vote: Vote;
    private percentages: Option[];

    error: any;
    sub: any;
    navigated = false; // true if navigated here

    constructor(
        private voteService: VoteService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {

                this.navigated = true;

                this.voteService
                    .getSingle(params['id'])
                    .subscribe((data: Vote) => this.vote = data,
                    error => console.log(error),
                    () => {
                        console.log("Get vote details to show completed");
                        this.prepareOptions();
                    });

            } else {
                this.navigated = false;
                this.vote = new Vote();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private participateVote() {
        console.log("participate in vote: " + this.vote.id);
        this.router.navigate(['/voteParticipate', this.vote.id]);
    }

    private editVote() {
        console.log("edit vote: " + this.vote.id);
        this.router.navigate(['/voteEditDetail', this.vote.id]);
    }

    private isDeletable() {

        if ((this.userService.getCurrentUser().id == this.vote.createdBy || this.userService.getCurrentUser().administrator) && this.vote.editable) {
            console.log("vote is deletable");
            return true;
        } else {
            console.log("vote is not deletable");
            return false;
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

    private prepareOptions() {

        console.log("prepareOptions called");

        this.percentages = new Array<Option>();

        let all: number;
        all = 0;

        for (let option of this.vote.options) {

            if (typeof option.counter === 'undefined' || option.counter === null) {
                option.counter = 0;
            }

            console.log("option.id: " + option.id + " - option.name: " + option.name + " - option.counter: " + option.counter);
            all = all + option.counter;
        }

        console.log("all: " + all);

        for (let option of this.vote.options) {

            let percentage = ((option.counter / all) * 100).toFixed(2);

            console.log("percentage: " + percentage);

            let o = new Option();
            o.id = option.id;
            o.name = option.name + ' (' + percentage + '%)';

            this.percentages.push(o);
        }
    }

    private deleteVote() {

        let response: Response;

        this.voteService
            .delete(this.vote)
            .subscribe((data: Response) => response = data,
            error => console.log(error),
            () => {
                console.log("Vote deleted");
                let link = ['/votes'];
                this.router.navigate(link);
            });
    }

    private goBack() {
        if (this.navigated) { window.history.back(); }
    }
}