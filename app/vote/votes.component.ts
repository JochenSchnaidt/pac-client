import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Vote }                 from './model/vote';
import { VoteService }          from './vote.service';
import { VoteDetailComponent }  from './detail/vote-detail.component';

import { VoteNewComponent }  from './new/vote-new.component';

@Component({
  selector: 'my-votes',
  templateUrl: 'app/vote/votes.component.html',
  styleUrls:  ['app/vote/votes.component.css'],
  directives: [VoteDetailComponent, VoteNewComponent]
})
export class VotesComponent implements OnInit {
  votes: Vote[];
  selectedVote: Vote;
  addingVote = false;
  error: any;

  constructor(
    private router: Router,
    private voteService: VoteService) { }

  getVotes() {
    this.voteService 
        .getAll()
        .subscribe((data:Vote[]) => this.votes = data,
                error => console.log(error),
                () => console.log('Get all votes completed'));
  }

  addVote() {
    this.addingVote = true;
    this.selectedVote = null;
  }

  close(savedVote: Vote) {
    this.addingVote = false;
    if (savedVote) { this.getVotes(); }
  }

  deleteVote(vote: Vote, event: any) {
    event.stopPropagation();
   /* this.voteService
        .delete(vote)
        .then(res => {
          this.votes = this.votes.filter(u => u !== vote);
          if (this.selectedVote === vote) { this.selectedVote = null; }
        })
        .catch(error => this.error = error);
  */}

  ngOnInit() {
    this.getVotes();
  }

  onSelect(vote : Vote) {
    this.selectedVote = vote;
    this.addingVote = false;
  }

  editVote() {
               console.log('edit vote');       
    this.router.navigate(['/voteDetail', this.selectedVote.id]);
  }
    
     participateVote() {
                  console.log('participate in vote');       
    this.router.navigate(['/voteParticipate', this.selectedVote.id]);       

  }
    
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/