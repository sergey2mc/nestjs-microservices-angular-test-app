import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { BaseService } from '@libs/shared';
import { UserDoc } from '@libs/shared/user';

@Injectable()
export class UserService extends BaseService<UserDoc> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDoc>,
  ) {
    super(userModel);
  }
}
