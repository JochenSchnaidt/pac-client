import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { User }                 from './model/user';
import { UserService }          from './user.service';
import { UserDetailComponent }  from './detail/user-detail.component';

@Component({
    selector: 'my-user',
    templateUrl: 'app/user/users.component.html',
    styleUrls: ['app/user/users.component.css'],
    directives: [UserDetailComponent],
    precompile: [UsersComponent]
})
export class UsersComponent implements OnInit {
    users: User[];
    selectedUser: User;
    addingUser = false;
    error: any;

    constructor(
        private router: Router,
        private userService: UserService) { }

    private getUsers() {
        this.userService
            .getAll()
            .subscribe((data: User[]) => this.users = data,
            error => console.log(error),
            () => console.log('Get all users completed'));
    }

    private addUser() {
        this.addingUser = true;
        this.selectedUser = null;
    }

    private close(savedUser: User) {
        this.addingUser = false;
        if (savedUser) { this.getUsers(); }
    }

    private deleteUser(user: User, event: any) {
        event.stopPropagation();
   /* this.userService
        .delete(user)
        .then(res => {
          this.users = this.users.filter(u => u !== user);
          if (this.selectedUser === user) { this.selectedUser = null; }
        })
        .catch(error => this.error = error);
  */}

    ngOnInit() {
        this.getUsers();
    }

    private onSelect(user: User) {
        this.selectedUser = user;
        this.addingUser = false;
    }

    private gotoDetail() {
        this.router.navigate(['/userDetail', this.selectedUser.email]);
    }
}