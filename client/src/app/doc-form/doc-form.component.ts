import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NEVER, Subscription, Subject } from 'rxjs';
import { catchError, switchMap, throttleTime } from 'rxjs/operators';

import { ApiService } from '../core/services/api.service';
import { User } from '../core/models/user.model';
import { Doc } from '../core/models/doc.model';

@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.scss']
})
export class DocFormComponent implements OnInit, OnDestroy {
  @Output() docCreated = new EventEmitter<Doc>();

  form: FormGroup = new FormGroup({
    userId: new FormControl<string>(''),
    title: new FormControl<string>(''),
  });

  createDocSubscription: Subscription;

  createDoc$: Subject<void> = new Subject();

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.createDocSubscription = this.createDoc$.pipe(
      throttleTime(1000),
      switchMap(() => this.apiService.createDoc(this.form.value).pipe(
        catchError(error => {
          alert(JSON.stringify(error));
          return NEVER;
        })
      ))
    ).subscribe(doc => {
      this.docCreated.emit(doc);
    });
  }

  ngOnDestroy(): void {
    this.createDocSubscription.unsubscribe();
  }

  onFormSubmit() {
    this.createDoc$.next();
  }
}
