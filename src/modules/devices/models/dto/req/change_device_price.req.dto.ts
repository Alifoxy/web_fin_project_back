import { IsString } from 'class-validator';

export class ChangeDevicePriceReqDto {
  @IsString()
  price: string;
}
