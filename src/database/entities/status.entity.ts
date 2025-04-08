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

  @OneToMany(() => DeviceEntity, (entity) => entity.status)
  devices?: DeviceEntity[];
}
