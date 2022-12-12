import { Global, Module } from '@nestjs/common';

const modules = [];
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
