import { IsBoolean, IsOptional } from 'class-validator';

export class ChangeStatusPropsReqDto {
  @IsOptional()
  @IsBoolean()
  manufacturer_required: boolean;

  @IsOptional()
  @IsBoolean()
  is_default: boolean;

  @IsOptional()
  @IsBoolean()
  is_return_ready: boolean;

  @IsOptional()
  @IsBoolean()
  is_final: boolean;
}
