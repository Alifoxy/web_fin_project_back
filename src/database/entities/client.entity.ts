import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { ClientID } from '../../common/types/entity-ids.type';
import { CreateUpdateModel } from './models/create-update.model';

@Index(['id'])
@Entity(TableNameEnum.CLIENTS)
export class ClientEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ClientID;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('text')
  email: string;

  @Column('text', { nullable: true })
  phone: string;

  // @Column('text')
  // device: string;
  //
  // @Column('text')
  // break_info: string;
}
