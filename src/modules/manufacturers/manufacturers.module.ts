import { forwardRef, Module } from '@nestjs/common';
import { DevicesModule } from '../devices/devices.module';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './services/manufacturers.service';
import { DevicesService } from '../devices/services/devices.service';

@Module({
  imports: [forwardRef(() => DevicesModule)],
  controllers: [ManufacturersController],
  providers: [ManufacturersService, DevicesService],
})
export class ManufacturersModule {}
