import { ClientResDto } from '../../../../clients/models/dto/res/client.res.dto';
// import { StatusResDto } from '../../../../statuses/models/dto/res/status.res.dto';
import { StatusResDto } from '../../../../statuses/models/dto/res/status.res.dto';

export class DeviceResDto {
  id: string;
  model: string;
  equipment: string;
  break_info: string;
  client: ClientResDto;
  status: StatusResDto;
  created: Date;
  updated: Date;
}
