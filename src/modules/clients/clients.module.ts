import { forwardRef, Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './services/clients.service';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [forwardRef(() => DevicesModule)],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
