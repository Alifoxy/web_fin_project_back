import { ClientID } from '../../../../../common/types/entity-ids.type';

export class ClientResDto {
  id: ClientID;
  name: string;
  surname: string;
  email: string;
  phone: string;
  created: Date;
  updated: Date;
}
