import { Module } from '@nestjs/common';

import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [CoreModule],
})
export class AppModule {}
