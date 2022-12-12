import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { lastValueFrom } from 'rxjs';

import { Microservices, Commands } from '@libs/shared';
import { CreateDocInput, Doc } from '@libs/shared/doc';

@Injectable()
export class DocClientService {
  constructor(
    @Inject(Microservices.DOC)
    private readonly docClient: ClientProxy
  ) {
  }

  requestGetDocs(input: Partial<Doc>): Promise<Doc[]> {
    return lastValueFrom(
      this.docClient.send<Doc[], Partial<Doc>>(
        { cmd: Commands.GET_DOCS },
        input
      )
    );
  }

  requestCreateDoc(input: CreateDocInput): Promise<Doc> {
    return lastValueFrom(
      this.docClient.send<Doc, CreateDocInput>(
        { cmd: Commands.CREATE_DOC },
        input
      )
    );
  }
}
