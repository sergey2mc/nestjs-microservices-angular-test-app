import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from '@nestjs/microservices';

import { Microservices, RedisConfigService } from '@libs/shared';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ClientsModule.registerAsync([{
      name: Microservices.DOC,
      useClass: RedisConfigService,
      inject: [ConfigService],
    }])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}
