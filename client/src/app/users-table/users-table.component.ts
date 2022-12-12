import { Component, Input, OnInit } from '@angular/core';

import { combineLatest, NEVER, Observable, ReplaySubject, Subject } from 'rxjs';
import { catchError, filter, map, scan, startWith, switchMap } from 'rxjs/operators';

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
  set userCreated(value: User) {
    if (value) {
      this.userCreated$.next(value);
    }
  }
  @Input()
  set docCreated(value: Doc) {
    if (value) {
      this.docCreated$.next(value);
    }
  }

  userCreated$: ReplaySubject<User> = new ReplaySubject(1);
  docCreated$: ReplaySubject<Doc> = new ReplaySubject(1);
  getDocs$: Subject<string> = new Subject();

  users$: Observable<User[]>;

  constructor(
    private apiService: ApiService
  ) {}


  ngOnInit() {
    this.users$ = combineLatest([
      this.userCreated$.pipe(
        startWith(null),
        switchMap(() => this.apiService.getUsers())
      ),
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
      scan((acc, [users, { docs, userId }]) => {
        if (!acc) {
          acc = [...users];
        }
        return acc.map(user => {
          return {
            ...user,
            docs: user._id === userId
              ? [...(user.docs || []), ...docs]
              : user.docs || []
          };
        });
      }, null)
    );
  }

  getUserDocs(userId: string) {
    this.getDocs$.next(userId);
  }
}
