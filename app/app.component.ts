import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import { UserService }        from './user/user.service';
import { VoteService }        from './vote/vote.service';
import { AuthenticationService }        from './authentication/authentication.service';

@Component({
  selector: 'my-app',

  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
      <a [routerLink]="['/users']" routerLinkActive="active">Users</a>
      <a [routerLink]="['/votes']" routerLinkActive="active">Votes</a>
    </nav>
    <router-outlet></router-outlet> 
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    UserService,
    VoteService,
    AuthenticationService
  ]
})
export class AppComponent {
  title = 'Voting Web Solution';
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/