import { ClientID } from '../../../../../common/types/entity-ids.type';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseClientReqDto } from '../../../../clients/models/dto/req/base-client.req.dto';
import { BaseDeviceReqDto } from '../../../../devices/models/dto/req/base-device.req.dto';

export class BaseRecordReqDto {
  @ValidateNested()
  @Type(() => BaseClientReqDto)
  @Type(() => BaseDeviceReqDto)
  client_id: ClientID;
  client: BaseClientReqDto;
  devices: BaseDeviceReqDto[];
}
