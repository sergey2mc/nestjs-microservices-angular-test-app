import { Body, Controller, Get, Post } from '@nestjs/common';

import { Observable } from 'rxjs';

import { CreateUserInput } from '@libs/shared/user';
import { UserClientService } from './user-client.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userClientService: UserClientService
  ) {}

  @Get()
  getUsers() {
    return this.userClientService.requestGetUsers();
  }

  @Post()
  createUser(
    @Body() input: CreateUserInput,
  ) {
    return this.userClientService.requestCreateUser(input);
  }
}
