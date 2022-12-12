import { Component } from '@angular/core';

import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: User[] = [];

  onUserCreated(user: User) {
    this.users.push(user);
  }
}
