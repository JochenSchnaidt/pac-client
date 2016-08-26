import { Component }                from '@angular/core';
import { ROUTER_DIRECTIVES }        from '@angular/router';

import { UserService }              from './user/user.service';
import { VoteService }              from './vote/vote.service';
import { AuthenticationService }    from './authentication/authentication.service';

@Component({
    selector: 'voting-application',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [
        UserService,
        VoteService,
        AuthenticationService
    ],
    directives: [ROUTER_DIRECTIVES]
})
    
export class AppComponent {
  title = 'Voting Web Solution';
}