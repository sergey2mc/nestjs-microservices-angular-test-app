import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { Microservices, RedisConfigService } from '@libs/shared';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Microservices.USER,
      useClass: RedisConfigService,
      inject: [ConfigService],
    }])
  ],
  controllers: [UserController],
})
export class UserModule {
}
