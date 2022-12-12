import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NEVER, Subscription, Subject } from 'rxjs';
import { catchError, switchMap, throttleTime } from 'rxjs/operators';

import { ApiService } from '../core/services/api.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Output() userCreated = new EventEmitter<User>();

  form: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    birthDate: new FormControl<Date>(new Date()),
    birthCountry: new FormControl<string>(''),
    language: new FormControl<string>(''),
    telephone: new FormControl<string>(''),
  });

  createUserSubscription: Subscription;

  createUser$: Subject<void> = new Subject();

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.createUserSubscription = this.createUser$.pipe(
      throttleTime(1000),
      switchMap(() => this.apiService.createUser(this.form.value).pipe(
        catchError(error => {
          alert(JSON.stringify(error));
          return NEVER;
        })
      ))
    ).subscribe(user => {
      this.userCreated.emit(user);
    });
  }

  ngOnDestroy(): void {
    this.createUserSubscription.unsubscribe();
  }

  onFormSubmit() {
    this.createUser$.next();
  }
}
