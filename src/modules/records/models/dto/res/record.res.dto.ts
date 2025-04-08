import { ClientResDto } from '../../../../clients/models/dto/res/client.res.dto';
import { DeviceListSimpleResDto } from '../../../../devices/models/dto/res/device-list-simple.res.dto';
import {
  ClientID,
  RecordID,
} from '../../../../../common/types/entity-ids.type';

export class RecordResDto {
  id: RecordID;
  client_id: ClientID;
  record_num: number;
  client: ClientResDto;
  devices: DeviceListSimpleResDto;
  created: Date;
  updated: Date;
}
