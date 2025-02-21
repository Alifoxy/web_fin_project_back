import { PickType } from '@nestjs/swagger';

import { BaseClientReqDto } from './base-client.req.dto';

export class UpdateClientDto extends PickType(BaseClientReqDto, [
  'name',
  'surname',
  'email',
]) {}
