import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateManDto {
  @IsNotEmpty()
  @IsString()
  manufacturer: string;
}
