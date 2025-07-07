import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class DeviceListQueryDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  page?: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  status?: string;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  manufacturer?: string;

  @IsOptional()
  @IsString()
  client?: string;
}
