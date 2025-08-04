import { IsString } from 'class-validator';

export class ChangeDeviceResultReqDto {
  @IsString()
  result: string;
}
