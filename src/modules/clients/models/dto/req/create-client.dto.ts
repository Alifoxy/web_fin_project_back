import { PickType } from '@nestjs/swagger';

import { BaseClientReqDto } from './base-client.req.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateClientDto extends PickType(BaseClientReqDto, [
  'name',
  'surname',
  'email',
  'phone',
]) {
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
