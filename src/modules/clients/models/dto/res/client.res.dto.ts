import { ClientID } from '../../../../../common/types/entity-ids.type';
import { RecordEntity } from '../../../../../database/entities/record.entity';

export class ClientResDto {
  id: ClientID;
  name: string;
  surname: string;
  email: string;
  phone: string;
  created: Date;
  updated: Date;
  records: RecordEntity[];
}
