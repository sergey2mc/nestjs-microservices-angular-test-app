import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Microservices, Commands } from '@libs/shared';
import { CreateUserInput, User } from '@libs/shared/user';

@Injectable()
export class UserClientService {
  constructor(
    @Inject(Microservices.USER)
    private readonly userClient: ClientProxy
  ) {
  }

  requestCreateUser(input: CreateUserInput): Observable<User | InternalServerErrorException> {
    return this.userClient.send<User, CreateUserInput>(
      { cmd: Commands.CREATE_USER },
      input
    ).pipe(
      catchError(error => of<InternalServerErrorException>(
        new InternalServerErrorException(error)
      ) as Observable<InternalServerErrorException>) // Todo: add proper error handler
    );
  }
}
