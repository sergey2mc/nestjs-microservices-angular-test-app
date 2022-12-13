import { Component, Input, OnInit } from '@angular/core';

import { uniqBy as _uniqBy } from 'lodash';
import { combineLatest, merge, NEVER, Observable, ReplaySubject, Subject } from 'rxjs';
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
      merge(
        this.getDocs$,
        this.docCreated$.pipe(
          map(doc => doc.userId)
        )
      ).pipe(
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
        return users.map(user => {
          const accUser = acc.find(u => u._id === user._id);
          return {
            ...user,
            docs: user._id === userId
              ? _uniqBy([...(accUser?.docs || []), ...docs], '_id')
              : accUser?.docs || []
          };
        });
      }, [])
    );
  }

  getUserDocs(userId: string) {
    this.getDocs$.next(userId);
  }
}
