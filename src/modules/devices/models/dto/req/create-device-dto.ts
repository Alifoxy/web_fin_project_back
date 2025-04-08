import { PickType } from '@nestjs/swagger';
import { BaseDeviceReqDto } from './base-device.req.dto';

export class CreateDeviceDto extends PickType(BaseDeviceReqDto, [
  'model',
  'equipment',
  'break_info',
]) {}
