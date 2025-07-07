import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateStatusDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsBoolean()
  manufacturer_required: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_default: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_return_ready: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_final: boolean;
}
