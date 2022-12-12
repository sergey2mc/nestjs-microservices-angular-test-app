import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { Types } from 'mongoose';

import { Commands } from '@libs/shared';
import { CreateUserInput, User } from '@libs/shared/user';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @MessagePattern({ cmd: Commands.GET_ALL_USERS })
  getUsers(): Promise<User[]> {
    return this.userService
      .getAllUsers()
      .catch(error => error); // Todo: add proper error handler
  }

  @MessagePattern({ cmd: Commands.GET_USERS_BY_IDS })
  getUsersByIds(
    input: Types.ObjectId[]
  ): Promise<User[]> {
    return this.userService
      .getUsersByIds(input)
      .catch(error => error); // Todo: add proper error handler
  }

  @MessagePattern({ cmd: Commands.CREATE_USER })
  createUser(
    input: CreateUserInput
  ): Promise<User> {
    return this.userService
      .createNewUser(input)
      .catch(error => error); // Todo: add proper error handler
  }
}
