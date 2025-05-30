import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { CreateDeviceDto } from './create-device-dto';

export class CreateDeviceListDto {
  // @Type(() => Number)
  // @IsInt()
  // @Max(100)
  // @Min(1)
  // @IsOptional()
  // limit?: number = 10;
  //
  // @Type(() => Number)
  // @IsInt()
  // @Min(0)
  // @IsOptional()
  // offset?: number = 0;

  devices: CreateDeviceDto[];
}
