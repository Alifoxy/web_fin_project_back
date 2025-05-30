import {
  IsNotEmpty,
  IsString, IsUUID

} from "class-validator";

export class ChangeDeviceStatusReqDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}
