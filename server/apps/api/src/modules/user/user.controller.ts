import { Body, Controller, Post } from '@nestjs/common';

import { Observable } from 'rxjs';
import { CreateUserInput } from '@libs/shared/user';
import { UserClientService } from './user-client.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userClientService: UserClientService
  ) {}

  @Post()
  create(
    @Body() input: CreateUserInput,
  ) {
    return this.userClientService.requestCreateUser(input);
  }
}
