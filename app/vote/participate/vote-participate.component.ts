import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Vote }               from '../model/vote';
import { VoteService }        from '../vote.service';

@Component({
    selector: 'my-vote-participate',
    templateUrl: 'app/vote/participate/vote-participate.component.html',
    styleUrls: ['app/vote/participate/vote-participate.component.css']
})
export class VoteParticipateComponent implements OnInit, OnDestroy {
    @Input() vote: Vote;
    @Output() close = new EventEmitter();
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
                    () => console.log('Get vote details completed'));

            } else {
                this.navigated = false;
                this.vote = new Vote();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save() {
//        this.voteService
//            .update(this.vote)
//
//            .subscribe(vote => {
//                this.vote = vote; // saved hero, w/ id if new
//                this.goBack(vote);
//            },
//            error => console.log(error),
//            () => console.log('Get all Items complete'));


        //        .then(vote => {
        //          this.vote = vote; // saved hero, w/ id if new
        //          this.goBack(vote);
        //        })
        //        .catch(error => this.error = error); // TODO: Display error message
    }
    goBack(savedVote: Vote = null) {
        this.close.emit(savedVote);
        if (this.navigated) { window.history.back(); }
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/