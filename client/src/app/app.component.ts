import { Component } from '@angular/core';

import { Subject } from 'rxjs';

import { User } from './core/models/user.model';
import { Doc } from './core/models/doc.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userCreated$: Subject<User> = new Subject();
  docCreated$: Subject<Doc> = new Subject();

  onUserCreated(user: User) {
    this.userCreated$.next(user);
  }

  onDocCreated(doc: Doc) {
    this.docCreated$.next(doc);
  }
}
