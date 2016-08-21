import { provideRouter, RouterConfig }  from '@angular/router';

import { DashboardComponent }        from './dashboard.component';

import { UsersComponent }            from './user/users.component';
import { UserDetailComponent }       from './user/detail/user-detail.component';

import { VotesComponent }            from './vote/votes.component';
import { VoteDetailComponent }       from './vote/detail/vote-detail.component';
import { VoteParticipateComponent }  from './vote/participate/vote-participate.component';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', 
    component: DashboardComponent
  },

  {
    path: 'votes',
    component: VotesComponent
  },
  
  {
    path: 'voteDetail/:id',
    component: VoteDetailComponent
  },

  {
    path: 'voteParticipate/:id',
    component: VoteParticipateComponent
  },

  
  
  {
    path: 'userDetail/:email',
    component: UserDetailComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/