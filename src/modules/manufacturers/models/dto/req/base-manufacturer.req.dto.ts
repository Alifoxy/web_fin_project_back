import { IsNotEmpty, IsString } from 'class-validator';

export class BaseManufacturerReqDto {
  @IsNotEmpty()
  @IsString()
  manufacturer: string;
}
