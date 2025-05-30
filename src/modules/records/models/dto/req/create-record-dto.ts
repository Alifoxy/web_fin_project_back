import { PickType } from '@nestjs/swagger';
import { BaseRecordReqDto } from './base-record.req.dto';

export class CreateRecordDto extends PickType(BaseRecordReqDto, [
  'client',
  'devices',
]) {}
