import { PickType } from '@nestjs/swagger';
import { BaseRecordReqDto } from './base-record.req.dto';

export class UpdateRecordDto extends PickType(BaseRecordReqDto, [
  'client_id',
]) {}
