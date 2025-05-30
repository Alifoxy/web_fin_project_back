import { ClientListQueryDto } from '../req/client-list-query.dto';
import { ClientResDto } from './client.res.dto';

export class ClientParamListResDto extends ClientListQueryDto {
  data: ClientResDto[];
  total: number;
}
