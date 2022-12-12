import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { Doc } from '../models/doc.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  createUser(input: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user`, input);
  }

  createDoc(input: Doc): Observable<Doc> {
    return this.http.post<Doc>(`${environment.apiUrl}/doc`, input);
  }
}
