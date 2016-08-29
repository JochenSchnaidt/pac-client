import { Component, EventEmitter }   from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

import { Vote }             from '../model/vote';
import { Option }           from '../model/option';
import { VoteService }      from '../vote.service';
import { UserService }      from './../../user/user.service';

@Component({
    selector: 'new-vote',
    templateUrl: 'app/vote/new/vote-new.component.html',
    styleUrls: ['app/vote/new/vote-new.component.css'],
//    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class VoteNewComponent {

    vote = new Vote();

    option1 = new Option();
    option2 = new Option();
    option3 = new Option();

    constructor(
        private voteService: VoteService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute) {

        this.vote.options = new Array<Option>();

        this.option1.id = 'option_1';
        this.option1.counter = 0;
        this.option2.id = 'option_2';
        this.option2.counter = 0;
        this.option3.id = 'option_3';
        this.option3.counter = 0;

        this.vote.options[0] = this.option1;
        this.vote.options[1] = this.option2;
        this.vote.options[2] = this.option3;

        console.log("Form Component Start");
    }

   private  save() {

        this.vote.createdBy = this.userService.getCurrentUser().id;
        this.vote.createdByUserName = this.userService.getCurrentUser().firstName + ' ' + this.userService.getCurrentUser().lastName;
        this.vote.editable = true;

        this.voteService
            .add(this.vote)
            .subscribe(vote => {
                this.vote = vote;
                this.goBack();
            },
            error => console.log(error),
            () => console.log("Error while vote creation"));
    }

    private goBack() {
        window.history.back();
    }

}