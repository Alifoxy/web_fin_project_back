import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeDeviceManufacturerReqDto {
  @IsNotEmpty()
  @IsString()
  manufacturer: string;
}
