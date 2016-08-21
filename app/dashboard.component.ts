import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';

 

import { User }           from './user/model/user';
import { UserService }    from './user/user.service';

import { Vote }           from './vote/model/vote';
import { VoteService }    from './vote/vote.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = []; 
  votes: Vote[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private voteService: VoteService) {
  }

  ngOnInit() {
      
       this.userService.getAll()
      .subscribe((data:User[]) => this.users = data,
                error => console.log(error),
                () => console.log('On dashboard init: Get all users complete'));
  
           this.voteService.getAll()
      .subscribe((data:Vote[]) => this.votes = data,
                error => console.log(error),
                () => console.log('On dashboard init: Get all votes complete'));
  
      
      
    //this.userService.getHeroes();
     // .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  goToUserDetail(user: User) {
    let link = ['/userDetail', user.email];
    this.router.navigate(link);
  }
    
  goToVoteDetail(vote: Vote) {
    let link = ['/voteDetail', vote.id];
    this.router.navigate(link);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/