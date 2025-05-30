import { StatusListQueryDto } from '../req/status-list-query.dto';
import { StatusResDto } from './status.res.dto';

export class StatusParamListResDto extends StatusListQueryDto {
  data: StatusResDto[];
  total: number;
}
