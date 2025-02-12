import { ClientListQueryDto } from '../req/client-list-query.dto';
import { ClientResDto } from './client.res.dto';

export class ClientListResDto extends ClientListQueryDto {
  data: ClientResDto[];
  total: number;
}
