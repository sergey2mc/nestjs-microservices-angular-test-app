import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, RedisOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const configModule = await NestFactory.createApplicationContext(ConfigModule);
  const configService = configModule.get(ConfigService);
  const app = await NestFactory.createMicroservice<RedisOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        retryAttempts: 20,
        retryDelay: 3000,
      }
    },
  );
  await app.listen();
}
bootstrap();
