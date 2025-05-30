import { ClientResDto } from '../../../../clients/models/dto/res/client.res.dto';
import {
  ClientID,
  RecordID,
} from '../../../../../common/types/entity-ids.type';

export class DeviceResDto {
  id: string;
  record_id: RecordID;
  client_id: ClientID;
  model: string;
  equipment: string;
  break_info: string;
  client: ClientResDto;
  status_name: string;
  manufacturer_name: string;
  created: Date;
  updated: Date;
}
