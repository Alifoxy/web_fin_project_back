import { PickType } from '@nestjs/swagger';

import { BaseClientReqDto } from './base-client.req.dto';

export class CreateClientDto extends PickType(BaseClientReqDto, [
  'name',
  'surname',
  'email',
  'phone',
]) {}
