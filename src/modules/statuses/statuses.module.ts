import { forwardRef, Module } from '@nestjs/common';
import { DevicesModule } from '../devices/devices.module';
import { StatusesService } from './services/statuses.service';
import { StatusesController } from './statuses.controller';
import { DevicesService } from '../devices/services/devices.service';

@Module({
  imports: [forwardRef(() => DevicesModule)],
  controllers: [StatusesController],
  providers: [StatusesService, DevicesService],
})
export class StatusesModule {}
