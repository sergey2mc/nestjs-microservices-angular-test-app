import { Global, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

const modules = [
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
