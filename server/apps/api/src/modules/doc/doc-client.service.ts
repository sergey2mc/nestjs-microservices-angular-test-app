import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Microservices, Commands } from '@libs/shared';
import { CreateDocInput, Doc } from '@libs/shared/doc';

@Injectable()
export class DocClientService {
  constructor(
    @Inject(Microservices.DOC)
    private readonly docClient: ClientProxy
  ) {
  }

  requestCreateDoc(input: CreateDocInput): Observable<Doc | InternalServerErrorException> {
    return this.docClient.send<Doc, CreateDocInput>(
      { cmd: Commands.CREATE_DOC },
      input
    ).pipe(
      catchError(error => of<InternalServerErrorException>(
        new InternalServerErrorException(error)
      ) as Observable<InternalServerErrorException>) // Todo: add proper error handler
    );
  }
}
