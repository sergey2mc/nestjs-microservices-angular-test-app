import { Component } from '@angular/core';

import { User } from './core/models/user.model';
import { Doc } from './core/models/doc.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: User[] = [];

  onUserCreated(user: User) {
    this.users = [
      ...this.users,
      user,
    ];
  }

  onDocCreated(doc: Doc) {
    const user = this.users.find(user => user._id === doc.userId);

    if (user) {
      this.users = this.users.map(user => {
        return {
          ...user,
          docs: user._id === doc.userId
            ? [...(user.docs || []), doc]
            : user.docs
        }
      })
    } else {
      alert (`No user found for created doc - ${JSON.stringify(doc)}`);
    }
  }
}
