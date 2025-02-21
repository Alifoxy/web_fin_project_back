import { IsNotEmpty, IsString } from 'class-validator';

export class BaseStatusReqDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}
