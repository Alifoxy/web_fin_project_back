import { forwardRef, Module } from '@nestjs/common';
import { DevicesModule } from '../devices/devices.module';
import { StatusesService } from './services/statuses.service';
import { StatusesController } from './statuses.controller';

@Module({
  imports: [forwardRef(() => DevicesModule)],
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}
