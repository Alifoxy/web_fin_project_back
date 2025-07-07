import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ChangeDevicePriceReqDto {
  @IsNotEmpty()
  @IsNumberString()
  price: string;
}
