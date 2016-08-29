import { Component, OnInit, OnDestroy }    from '@angular/core';
import { ActivatedRoute }                  from '@angular/router';

import { Vote }               from '../model/vote';
import { VoteService }        from '../vote.service';

@Component({
    selector: 'my-vote-detail',
    templateUrl: 'app/vote/edit/vote-edit-detail.component.html',
    styleUrls: ['app/vote/edit/vote-edit-detail.component.css']
})
export class VoteEditDetailComponent implements OnInit, OnDestroy {

    vote: Vote;

    error: any;
    sub: any;
    navigated = false; // true if navigated here

    constructor(
        private voteService: VoteService,
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
                    () => console.log("Get vote details to edit completed"));

            } else {
                this.navigated = false;
                this.vote = new Vote();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private save() {
        this.voteService
            .update(this.vote)
            .subscribe(vote => {
                this.vote = vote;
                this.goBack(vote);
            },
            error => console.log(error),
            () => console.log("vote updated"));
    }

 private   goBack(savedVote: Vote = null) {
        if (this.navigated) { window.history.back(); }
    }
}
