import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { Observable } from 'rxjs';

import { CreateDocInput } from '@libs/shared/doc';
import { DocClientService } from './doc-client.service';

@Controller('doc')
export class DocController {
  constructor(
    private readonly docClientService: DocClientService,
  ) {}

  @Get()
  getByUserId(
    @Query('userId') userId: string
  ) {
    return this.docClientService.requestGetDocs({ userId });
  }

  @Post()
  create(
    @Body() input: CreateDocInput,
  ) {
    return this.docClientService.requestCreateDoc(input);
  }
}
