import { Global, Module } from '@nestjs/common';

import { ClientRepository } from './services/client.repository';
const repositories = [ClientRepository];
@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
