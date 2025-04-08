import { PickType } from '@nestjs/swagger';
import { BaseManufacturerReqDto } from './base-manufacturer.req.dto';

export class CreateUpdateManufacturerDto extends PickType(
  BaseManufacturerReqDto,
  ['manufacturer'],
) {}
