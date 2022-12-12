import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { lastValueFrom } from 'rxjs';

import { Microservices, Commands } from '@libs/shared';
import { CreateUserInput, User } from '@libs/shared/user';

@Injectable()
export class UserClientService {
  constructor(
    @Inject(Microservices.USER)
    private readonly userClient: ClientProxy
  ) {
  }

  requestGetUsers(): Promise<User[]> {
    return lastValueFrom(
      this.userClient.send<User[], {}>(
        { cmd: Commands.GET_ALL_USERS },
        {}
      )
    );
  }

  requestCreateUser(input: CreateUserInput): Promise<User> {
    return lastValueFrom(
      this.userClient.send<User, CreateUserInput>(
        { cmd: Commands.CREATE_USER },
        input
      )
    );
  }
}
