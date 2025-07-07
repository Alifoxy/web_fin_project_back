import { RecordListQueryDto } from '../req/record-list-query.dto';
import { RecordResDto } from './record.res.dto';

export class RecordListResDto extends RecordListQueryDto {
  data: RecordResDto[];
  total: number;
  page: string;
}
