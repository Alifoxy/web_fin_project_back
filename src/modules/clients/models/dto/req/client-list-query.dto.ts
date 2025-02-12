import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class ClientListQueryDto {
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

  @IsOptional()
  @IsNumberString()
  @IsPhoneNumber('UA')
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  @IsEmail()
  email?: string;
}
