import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { ClientID, RecordID } from '../../common/types/entity-ids.type';
import { DeviceEntity } from './device.entity';
import { ClientEntity } from './client.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Index(['id'])
@Entity(TableNameEnum.RECORDS)
export class RecordEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: RecordID;

  @Column('text')
  record_num: number;

  @Column({ nullable: true })
  client_id: ClientID;
  @ManyToOne(() => ClientEntity, (entity) => entity.records)
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;

  @OneToMany(() => DeviceEntity, (entity) => entity.record)
  devices?: DeviceEntity[];

  @Column({ type: 'boolean', default: false })
  is_closed: boolean;
}
