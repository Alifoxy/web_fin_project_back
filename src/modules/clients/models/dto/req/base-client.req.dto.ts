import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
export class BaseClientReqDto {
  @IsOptional()
  @Length(0, 300)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(0, 300)
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;
}
