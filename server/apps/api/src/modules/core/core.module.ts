import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configSchema } from '@libs/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configSchema,
      isGlobal: true,
    }),
  ],
})
export class CoreModule {}
