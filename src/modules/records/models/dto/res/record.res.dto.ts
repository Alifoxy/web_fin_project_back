import { ClientResDto } from '../../../../clients/models/dto/res/client.res.dto';
import {
  ClientID,
  RecordID,
} from '../../../../../common/types/entity-ids.type';
import { DeviceResDto } from '../../../../devices/models/dto/res/device.res.dto';

export class RecordResDto {
  id: RecordID;
  client_id: ClientID;
  record_num: number;
  client: ClientResDto;
  devices: DeviceResDto[];
  is_closed: boolean;
  created: string;
  updated: string;
}
