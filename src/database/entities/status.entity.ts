import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { StatusID } from '../../common/types/entity-ids.type';
import { DeviceEntity } from './device.entity';
import { CreateModel } from './models/create.model';

@Index(['id'])
@Entity(TableNameEnum.STATUSES)
export class StatusEntity extends CreateModel {
  @PrimaryGeneratedColumn('uuid')
  id: StatusID;

  @Column('text')
  status: string;

  @Column({ type: 'boolean', default: false })
  manufacturer_required: boolean;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @Column({ type: 'boolean', default: false })
  is_return_ready: boolean;

  @Column({ type: 'boolean', default: false })
  is_final: boolean;

  @OneToMany(() => DeviceEntity, (entity) => entity.status)
  devices?: DeviceEntity[];
}
