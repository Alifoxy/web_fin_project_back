import { forwardRef, Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './services/devices.service';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [forwardRef(() => ClientsModule)],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
