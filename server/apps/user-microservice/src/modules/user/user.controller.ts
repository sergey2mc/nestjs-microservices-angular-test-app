import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { Commands } from '@libs/shared';
import { CreateUserInput, User } from '@libs/shared/user';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @MessagePattern({
    cmd: Commands.CREATE_USER
  })
  createUser(
    input: CreateUserInput
  ): Promise<User> {
    return this.userService
      .createNewUser(input)
      .catch(error => error); // Todo: add proper error handler
  }
}
