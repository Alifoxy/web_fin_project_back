import { Global, Module } from '@nestjs/common';

import { ClientRepository } from './services/client.repository';
import { DeviceRepository } from './services/device.repository';
import { ManufacturerRepository } from './services/manufacturer.repository';
import { StatusRepository } from './services/status.repository';
import { RecordRepository } from './services/record.repository';
const repositories = [
  RecordRepository,
  ClientRepository,
  DeviceRepository,
  ManufacturerRepository,
  StatusRepository,
];
@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
