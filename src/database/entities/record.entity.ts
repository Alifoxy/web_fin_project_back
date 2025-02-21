import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { ClientID, RecordID } from '../../common/types/entity-ids.type';
import { DeviceEntity } from './device.entity';
import { ClientEntity } from './client.entity';

@Index(['id'])
// @Entity(TableNameEnum.RECORDS)
export class RecordEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: RecordID;

  // @Column()
  // client_id: ClientID;
  // @OneToOne(() => ClientEntity, (entity) => entity.record_id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'client_id' })
  // client?: ClientEntity;

  // @OneToOne(() => ClientEntity, (entity) => entity.record_id)
  // client?: ClientEntity;

  // @OneToMany(() => DeviceEntity, (entity) => entity.record_id)
  // devices?: DeviceEntity[];
}
