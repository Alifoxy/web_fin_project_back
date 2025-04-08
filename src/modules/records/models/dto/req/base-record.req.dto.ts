import { CreateClientDto } from '../../../../clients/models/dto/req/create-client.dto';
import { CreateDeviceDto } from '../../../../devices/models/dto/req/create-device-dto';
import { ClientID } from '../../../../../common/types/entity-ids.type';

export class BaseRecordReqDto {
  client_id: ClientID;
  client: CreateClientDto;
  devices: CreateDeviceDto[];
}
