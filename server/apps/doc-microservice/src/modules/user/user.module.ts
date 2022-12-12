import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { Microservices, RedisConfigService } from '@libs/shared';
import { UserController } from './user.controller';
import { UserClientService } from './user-client.service';

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Microservices.USER,
      useClass: RedisConfigService,
      inject: [ConfigService],
    }])
  ],
  controllers: [UserController],
  providers: [UserClientService],
  exports: [UserClientService],
})
export class UserModule {
}
