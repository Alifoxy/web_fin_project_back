import { PickType } from '@nestjs/swagger';
import { BaseStatusReqDto } from './base-status.req.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateStatusDto extends PickType(BaseStatusReqDto, [
  'status',
]) {
  @IsNotEmpty()
  @IsString()
  status: string;
}
