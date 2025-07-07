import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { ManufacturerID } from '../../common/types/entity-ids.type';
import { DeviceEntity } from './device.entity';
import { CreateModel } from './models/create.model';

@Index(['id'])
@Entity(TableNameEnum.MANUFACTURERS)
export class ManufacturerEntity extends CreateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ManufacturerID;

  @Column('text')
  manufacturer: string;

  @OneToMany(() => DeviceEntity, (entity) => entity.manufacturer)
  devices?: DeviceEntity[];
}
