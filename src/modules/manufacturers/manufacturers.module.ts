import { forwardRef, Module } from '@nestjs/common';
import { DevicesModule } from '../devices/devices.module';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './services/manufacturers.service';

@Module({
  imports: [forwardRef(() => DevicesModule)],
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
})
export class ManufacturersModule {}
