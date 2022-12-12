import { Global, Module } from '@nestjs/common';

import { DocModule } from '../doc/doc.module';
import { UserModule } from '../user/user.module';

const modules = [
  DocModule,
  UserModule,
];
const providers = [];
const guards = [];
const services = [];

@Global()
@Module({
  imports: [...modules],
  providers: [...guards, ...providers, ...services],
  exports: [...modules, ...providers, ...services],
})
export class SharedModule {}
