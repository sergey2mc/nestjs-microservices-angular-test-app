import { Module } from '@nestjs/common';

import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
  ],
})
export class AppModule {}
