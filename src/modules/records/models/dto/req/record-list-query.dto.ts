import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsPhoneNumber, IsString, Max, Min } from "class-validator";
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class RecordListQueryDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 10;

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

  // @IsOptional()
  // @IsPhoneNumber('UA')
  // phone?: string;
  //
  // @IsOptional()
  // @IsString()
  // @Length(0, 300)
  // status?: string;
  //
  // @IsString()
  // @IsOptional()
  // client?: string;
  @IsOptional()
  @IsPhoneNumber('UA')
  cli_phone?: string;
}
