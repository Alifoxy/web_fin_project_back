import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class BaseDeviceReqDto {
  @IsNotEmpty()
  @Length(0, 300)
  @IsString()
  model: string;

  @IsOptional()
  @Length(0, 3000)
  @IsString()
  equipment: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 3000)
  break_info: string;

  @IsNotEmpty()
  @IsPhoneNumber('UA')
  phone: string;
}
