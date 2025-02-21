import { PickType } from '@nestjs/swagger';
import { BaseDeviceReqDto } from './base-device.req.dto';

export class UpdateDeviceDto extends PickType(BaseDeviceReqDto, [
  'equipment',
  'break_info',
  'status',
]) {}
