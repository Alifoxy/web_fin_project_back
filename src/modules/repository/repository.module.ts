import { Global, Module } from '@nestjs/common';

import { ClientRepository } from './services/client.repository';
import { DeviceRepository } from './services/device.repository';
const repositories = [ClientRepository, DeviceRepository];
@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
