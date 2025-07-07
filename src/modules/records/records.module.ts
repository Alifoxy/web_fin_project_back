import { forwardRef, Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { ClientsModule } from '../clients/clients.module';
import { RecordsService } from './services/records.service';
import { ClientsService } from '../clients/services/clients.service';
import { DevicesService } from '../devices/services/devices.service';
import { StatusesService } from '../statuses/services/statuses.service';

@Module({
  imports: [forwardRef(() => ClientsModule)],
  controllers: [RecordsController],
  providers: [RecordsService, ClientsService, DevicesService, StatusesService],
})
export class RecordsModule {}
