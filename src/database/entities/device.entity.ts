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
  client_phone: string;

  @Column('text')
  model: string;

  @Column('text')
  equipment: string;

  @Column('text')
  break_info: string;

  @Column()
  status_id: StatusID;
  @ManyToOne(() => StatusEntity, (entity) => entity.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'status_id' })
  status?: StatusEntity;

  @Column()
  manufacturer_id: ManufacturerID;
  @ManyToOne(() => ManufacturerEntity, (entity) => entity.devices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer?: ManufacturerEntity;

  @Column('text')
  result: string;

  @Column('text')
  price: string;

  // @Column()
  // record_id: RecordID;
  // @ManyToOne(() => RecordEntity, (entity) => entity.devices, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'id' })
  // record?: RecordEntity;

  // @Column({ nullable: false })
  // status: StatusEnum;
}
