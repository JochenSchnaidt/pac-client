import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Vote }                     from './model/vote';
import { VoteService }              from './vote.service';
import { VoteEditDetailComponent }  from './edit/vote-edit-detail.component';
import { VoteShowDetailComponent }  from './show/vote-show-detail.component';
import { VoteNewComponent }         from './new/vote-new.component';

import { AuthenticationService }    from '../authentication/authentication.service';

@Component({
    selector: 'my-votes',
    templateUrl: 'app/vote/votes.component.html',
    styleUrls: ['app/vote/votes.component.css'],
    directives: [VoteEditDetailComponent, VoteShowDetailComponent, VoteNewComponent]
})
export class VotesComponent implements OnInit {

    votes: Vote[];
    selectedVote: Vote;
    error: any;

    constructor(
        private router: Router,
        private voteService: VoteService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {

        if (this.authenticationService.isAuthenticated()) {
            this.getVotes();
        } else {    
            console.error("user not authenticated");
        }
    }


    private getVotes() {
        this.voteService
            .getAll()
            .subscribe((data: Vote[]) => this.votes = data,
            error => console.log(error),
            () => console.log("Get all votes completed"));
    }

    private addVote() {
        this.selectedVote = null;
        console.log("create new vote");
        this.router.navigate(['/voteNew']);
    }

    private deleteVote(vote: Vote, event: any) {
        event.stopPropagation();
   /* this.voteService
        .delete(vote)
        .then(res => {
          this.votes = this.votes.filter(u => u !== vote);
          if (this.selectedVote === vote) { this.selectedVote = null; }
        })
        .catch(error => this.error = error);
  */}

    private onSelect(vote: Vote) {
        this.selectedVote = vote;
        console.log("show vote");
        this.router.navigate(['/voteShowDetail', this.selectedVote.id]);
    }

}