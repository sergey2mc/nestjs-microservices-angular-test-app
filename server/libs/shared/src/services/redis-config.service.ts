import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ClientsModuleOptionsFactory, RedisOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RedisConfigService implements ClientsModuleOptionsFactory {
  constructor(
    private configService: ConfigService,
  ) {}

  createClientOptions(): RedisOptions {
    return {
      transport: Transport.REDIS,
      options: {
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
        retryAttempts: 20,
        retryDelay: 3000,
      }
    };
  }
}
