import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DocSchema } from './schemas/doc.schema';
import { DocController } from './doc.controller';
import { DocService } from './doc.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doc', schema: DocSchema }]),
  ],
  controllers: [DocController],
  providers: [DocService],
})
export class DocModule {
}
