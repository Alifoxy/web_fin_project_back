import { PickType } from '@nestjs/swagger';
import { BaseStatusReqDto } from './base-status.req.dto';

export class CreateUpdateStatusDto extends PickType(BaseStatusReqDto, [
  'status',
]) {}
