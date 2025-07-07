import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import {
  ClientID,
  DeviceID,
  RecordID,
  StatusID,
} from '../../common/types/entity-ids.type';
import { ClientEntity } from './client.entity';
import { RecordEntity } from './record.entity';
import { StatusEntity } from './status.entity';
import { ManufacturerEntity } from './manufacturer.entity';

@Index(['id'])
@Entity(TableNameEnum.DEVICES)
export class DeviceEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: DeviceID;

  @Column()
  client_id: ClientID;
  @ManyToOne(() => ClientEntity, (entity) => entity.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;

  @Column('text')
  model: string;

  @Column('text')
  equipment: string;

  @Column('text')
  break_info: string;

  @Column({ type: 'boolean', default: false })
  is_returned: boolean;

  @Column()
  status_id: StatusID;
  @ManyToOne(() => StatusEntity, (entity) => entity.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'status_id' })
  status?: StatusEntity;

  @Column({ nullable: true })
  manufacturer: string;
  @ManyToOne(() => ManufacturerEntity, (entity) => entity.devices, {
    onDelete: 'CASCADE',
  })
  @Column('text', { nullable: true })
  result: string;

  @Column('text', { nullable: true })
  price: string;

  @Column({ nullable: true })
  record_id: RecordID;
  @ManyToOne(() => RecordEntity, (entity) => entity.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'record_id' })
  record?: RecordEntity;
}
