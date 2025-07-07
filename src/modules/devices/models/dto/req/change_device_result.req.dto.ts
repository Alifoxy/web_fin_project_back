import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeDeviceResultReqDto {
  @IsNotEmpty()
  @IsString()
  result: string;
}
