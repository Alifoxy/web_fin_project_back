import { IsString } from 'class-validator';

export class ChangeDeviceManufacturerReqDto {
  @IsString()
  manufacturer: string;
}
