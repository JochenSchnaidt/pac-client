import { provideRouter, RouterConfig }  from '@angular/router';

import { AuthenticationComponent }      from './authentication/authentication.component';

import { DashboardComponent }           from './dashboard/dashboard.component';

import { UsersComponent }               from './user/users.component';
import { UserDetailComponent }          from './user/detail/user-detail.component';

import { VotesComponent }               from './vote/votes.component';
import { VoteNewComponent }             from './vote/new/vote-new.component';
import { VoteShowDetailComponent }      from './vote/show/vote-show-detail.component';
import { VoteEditDetailComponent }      from './vote/edit/vote-edit-detail.component';
import { VoteParticipateComponent }     from './vote/participate/vote-participate.component';

export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/authentication',
        //      redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        component: AuthenticationComponent
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
        path: 'voteNew',
        component: VoteNewComponent
    },
    {
        path: 'voteShowDetail/:id',
        component: VoteShowDetailComponent
    },
    {
        path: 'voteEditDetail/:id',
        component: VoteEditDetailComponent
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