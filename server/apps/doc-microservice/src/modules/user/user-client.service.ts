import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';

import { Microservices, Commands } from '@libs/shared';
import { User } from '@libs/shared/user';

@Injectable()
export class UserClientService {
  constructor(
    @Inject(Microservices.USER)
    private readonly userClient: ClientProxy
  ) {
  }

  requestGetUsersByIds(input: Types.ObjectId[]): Promise<User[]> {
    return lastValueFrom(
      this.userClient.send<User[], Types.ObjectId[]>(
        { cmd: Commands.GET_USERS_BY_IDS },
        input
      )
    );
  }
}
