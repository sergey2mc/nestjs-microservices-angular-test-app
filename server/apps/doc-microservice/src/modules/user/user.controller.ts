import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { Events } from '@libs/shared';
import { User } from '@libs/shared/user';

@Controller()
export class UserController {
  @EventPattern(Events.USER_CREATED)
  onUserCreated(
    input: User
  ) {
    // Todo: do something on new user created
  }
}
