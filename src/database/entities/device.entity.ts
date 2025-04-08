import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import {
  ClientID,
  DeviceID, ManufacturerID,
  RecordID, StatusID
} from "../../common/types/entity-ids.type";
import { ClientEntity } from './client.entity';
import { RecordEntity } from './record.entity';
import { StatusEnum } from '../../modules/devices/models/enums/status.enum';
import { StatusEntity } from "./status.entity";
import { ManufacturerEntity } from "./manufacturer.entity";

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

  @Column()
  phone: string;

  @Column('text')
  model: string;

  @Column('text')
  equipment: string;

  @Column('text')
  break_info: string;

  @Column({ nullable: true })
  status_name: string;
  @ManyToOne(() => StatusEntity, (entity) => entity.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'status_id' })
  status?: StatusEntity;

  @Column({ nullable: true })
  manufacturer_name: string;
  @ManyToOne(() => ManufacturerEntity, (entity) => entity.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer?: ManufacturerEntity;

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

  // @Column({ nullable: false })
  // status: StatusEnum;
}
