import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { Commands } from '@libs/shared';
import { CreateDocInput, Doc } from '@libs/shared/doc';
import { DocService } from './doc.service';

@Controller()
export class DocController {
  constructor(
    private readonly docService: DocService
  ) {}

  @MessagePattern({ cmd: Commands.CREATE_DOC })
  createUser(
    input: CreateDocInput
  ): Promise<Doc> {
    return this.docService
      .createNewDoc(input)
      .catch(error => error); // Todo: add proper error handler
  }
}
