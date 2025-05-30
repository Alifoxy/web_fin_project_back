import { IsString } from 'class-validator';

export class ClientQueryDto {
  @IsString()
  // @IsPhoneNumber('UA')
  phone?: string;
}
