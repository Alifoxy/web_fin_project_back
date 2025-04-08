import { forwardRef, Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './services/clients.service';
import { DevicesModule } from '../devices/devices.module';
import { RecordsModule } from '../records/records.module';

@Module({
  imports: [forwardRef(() => DevicesModule), RecordsModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
