import { Component, EventEmitter, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';



import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';



import { Vote }               from '../model/vote';
import { Option }               from '../model/option';
import { VoteService }        from '../vote.service';

@Component({
    selector: 'new-vote',
    templateUrl: 'app/vote/new/vote-new.component.html',
    styleUrls: ['app/vote/new/vote-new.component.css'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class VoteNewComponent {

    @Output() close = new EventEmitter();

    vote = new Vote();

    option1 = new Option();
    option2 = new Option();
    option3 = new Option();



    error: any;
    sub: any;
    navigated = false; // true if navigated here

    constructor(
        private voteService: VoteService,
        private route: ActivatedRoute) {

                this.vote.options = new Array <Option>();
        
        this.vote.options[0] = this.option1;
           this.vote.options[1] = this.option2;
           this.vote.options[2] = this.option3;
        

        console.log("Form Component Start");
    }




    save() {
        
        this.vote.createdBy = 'Jochen Schnaidt';
        this.vote.editable = true;
        
        
        this.voteService
            .add(this.vote)
            .subscribe(vote => {
                this.vote = vote; // saved hero, w/ id if new
                this.goBack(vote);
            },
            error => console.log(error),
            () => console.log('Error while vote creation'));
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