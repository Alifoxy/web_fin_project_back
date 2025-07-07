import { forwardRef, Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './services/devices.service';
import { ClientsModule } from '../clients/clients.module';
import { StatusesService } from '../statuses/services/statuses.service';
import { ClientsService } from '../clients/services/clients.service';

@Module({
  imports: [forwardRef(() => ClientsModule)],
  controllers: [DevicesController],
  providers: [DevicesService, StatusesService, ClientsService],
})
export class DevicesModule {}
