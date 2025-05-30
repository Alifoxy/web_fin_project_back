import { PickType } from '@nestjs/swagger';
import { BaseManufacturerReqDto } from './base-manufacturer.req.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateManDto extends PickType(BaseManufacturerReqDto, [
  'manufacturer',
]) {
  @IsNotEmpty()
  @IsString()
  manufacturer: string;
}
