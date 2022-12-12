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

  @MessagePattern({ cmd: Commands.GET_DOCS })
  getDocs(
    input: Partial<Doc>
  ): Promise<Doc[]> {
    return this.docService
      .getDocs(input)
      .catch(error => error); // Todo: add proper error handler
  }

  @MessagePattern({ cmd: Commands.CREATE_DOC })
  createDoc(
    input: CreateDocInput
  ): Promise<Doc> {
    return this.docService
      .createNewDoc(input)
      .catch(error => error); // Todo: add proper error handler
  }
}
