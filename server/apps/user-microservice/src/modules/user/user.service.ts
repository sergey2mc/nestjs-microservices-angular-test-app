import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy } from '@nestjs/microservices';

import { Model, Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';

import { BaseService, Events, Microservices } from '@libs/shared';
import { CreateUserInput, User, UserDoc } from '@libs/shared/user';

@Injectable()
export class UserService extends BaseService<UserDoc> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDoc>,
    @Inject(Microservices.DOC)
    private readonly docClient: ClientProxy,
  ) {
    super(userModel);
  }

  async getAllUsers(): Promise<User[]> {
    return this.find({}).lean();
  }

  async getUsersByIds(input: Types.ObjectId[]): Promise<User[]> {
    return this.find({
      _id: { $in: input }
    });
  }

  async createNewUser(input: CreateUserInput): Promise<User> {
    const user = await this.create(input);

    // Emit USER_CREATED event to Doc microservice
    await lastValueFrom(
      this.docClient.emit<User>(Events.USER_CREATED, user)
    );

    return user;
  }
}
