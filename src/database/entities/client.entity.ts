import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { ClientID, RecordID } from '../../common/types/entity-ids.type';
import { CreateUpdateModel } from './models/create-update.model';
import { DeviceEntity } from './device.entity';

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

  @Column('text', { nullable: false })
  phone: string;

  @OneToMany(() => DeviceEntity, (entity) => entity.client)
  devices?: DeviceEntity[];

  // @Column()
  // record_id: RecordID;
  // @OneToOne(() => RecordEntity, (entity) => entity.client, {
  //   onDelete: 'SET NULL',
  // })
  // @JoinColumn({ name: 'client_id' })
  // record?: RecordEntity;
}
