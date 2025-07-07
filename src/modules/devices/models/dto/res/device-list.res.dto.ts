import { DeviceListQueryDto } from '../req/device-list-query.dto';
import { DeviceResDto } from './device.res.dto';

export class DeviceListResDto extends DeviceListQueryDto {
  data: DeviceResDto[];
  total: number;
}
