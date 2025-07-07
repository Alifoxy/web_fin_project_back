import { ClientResDto } from '../../../../clients/models/dto/res/client.res.dto';
import {
  ClientID,
  RecordID,
} from '../../../../../common/types/entity-ids.type';
import { StatusResDto } from '../../../../statuses/models/dto/res/status.res.dto';

export class DeviceResDto {
  id: string;
  record_id: RecordID;
  client_id: ClientID;
  model: string;
  equipment: string;
  break_info: string;
  client: ClientResDto;
  status: StatusResDto;
  result: string;
  price: string;
  manufacturer: string;
  created: string;
  updated: string;
}
