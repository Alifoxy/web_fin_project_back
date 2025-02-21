import { StatusListQueryDto } from '../req/status-list-query.dto';
import { StatusResDto } from './status.res.dto';

export class StatusListResDto extends StatusListQueryDto {
  data: StatusResDto[];
  total: number;
}
