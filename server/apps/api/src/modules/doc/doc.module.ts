import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { Microservices, RedisConfigService } from '@libs/shared';
import { DocController } from './doc.controller';
import { DocClientService } from './doc-client.service';

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: Microservices.DOC,
      useClass: RedisConfigService,
      inject: [ConfigService],
    }])
  ],
  controllers: [DocController],
  providers: [DocClientService],
})
export class DocModule {
}
