import { Component, Input, OnInit } from '@angular/core';

import { combineLatest, NEVER, Observable, ReplaySubject, Subject } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';

import { User } from '../core/models/user.model';
import { ApiService } from '../core/services/api.service';
import { Doc } from '../core/models/doc.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @Input()
  set users(value: User[]) {
    if (value) {
      this.usersSub$.next(value);
    }
  }

  usersSub$: ReplaySubject<User[]> = new ReplaySubject(1);
  getDocs$: Subject<string> = new Subject();

  users$: Observable<User[]>;

  constructor(
    private apiService: ApiService
  ) {}


  ngOnInit() {
    this.users$ = combineLatest([
      this.usersSub$,
      this.getDocs$.pipe(
        filter(userId => !!userId),
        switchMap(userId => this.apiService.getDocs(userId).pipe(
          map(docs => ({ userId, docs })),
          catchError(error => {
            alert(JSON.stringify(error));
            return NEVER;
          })
        )),
        startWith({} as { userId: string; docs: Doc[] })
      ),
    ]).pipe(
      map(([users, { docs, userId }]) => {
        return users.map(user => {
          return {
            ...user,
            docs: user._id === userId
              ? [...(user.docs || []), ...docs]
              : user.docs || []
          };
        });
      })
    );
  }

  getUserDocs(userId: string) {
    this.getDocs$.next(userId);
  }
}
