import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../../repository/services/device.repository';
import { RecordRepository } from '../../repository/services/record.repository';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { ClientRepository } from '../../repository/services/client.repository';
import { DeviceListQueryDto } from '../models/dto/req/device-list-query.dto';
import { UpdateDeviceDto } from '../models/dto/req/update-device.dto';
import {
  ClientID,
  DeviceID,
  RecordID,
} from '../../../common/types/entity-ids.type';
import { RecordEntity } from '../../../database/entities/record.entity';
import { ChangeDeviceStatusReqDto } from '../models/dto/req/change_device_status.req.dto';
import { StatusRepository } from "../../repository/services/status.repository";
import { StatusEntity } from "../../../database/entities/status.entity";

@Injectable()
export class DevicesService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
    private readonly statusRepository: StatusRepository,
  ) {}
  public async create(
    record: RecordEntity,
    devices: DeviceEntity[],
  ): Promise<RecordEntity> {
    await devices.forEach((device) =>
      this.deviceRepository.save(
        this.deviceRepository.create(
          {
            id: device.id,
            record_id: record.id,
            client_id: record.client_id,
            model: device.model,
            equipment: device.equipment,
            break_info: device.break_info,
            status_name: device.status_name,
            manufacturer_name: device.manufacturer_name,
          },
          // model: device.model,
          // equipment: device.equipment,
          // break_info: device.break_info,
          // status_name: device.status_name,
        ),
      ),
    );

    // const devs = DevicesMapper.toSimpleResDtoList(devices);
    // const dev = devices.map((device) => ({
    //   model: device.model,
    //   equipment: device.equipment,
    //   record_id: rec.id,,
    // }));
    // this.deviceRepository.merge(dev, {record_id: rec.id, client_id: client,});
    // this.deviceRepository.save(devs);
    const devs = await this.deviceRepository.findBy({
      record_id: record.id,
    });
    const rec = await this.recordRepository.findOneBy({ id: record.id });

    await this.recordRepository.merge(rec, { devices: devs });
    return await this.recordRepository.save(rec);
  }

  public async findAll(
    query: DeviceListQueryDto,
  ): Promise<[DeviceEntity[], number]> {
    return await this.deviceRepository.findAll(query);
  }

  public async findByParams(
    query: DeviceListQueryDto,
  ): Promise<[DeviceEntity[], number]> {
    return await this.deviceRepository.findByParams(query);
  }

  // public async findAllByRecId(
  //   query: DeviceListQueryDto,
  // ): Promise<DeviceEntity[]> {
  //   return await this.deviceRepository.findAllByRec(query);
  // }
  public async findOneById(deviceId: DeviceID): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findOneBy({ id: deviceId });
    const client = await this.clientRepository.findOneBy({
      id: device.client_id,
    });
    await this.deviceRepository.merge(device, { client: client });
    return await this.deviceRepository.save(device);
  }

  public async findOne(clientId: ClientID): Promise<DeviceEntity> {
    return await this.deviceRepository.findOneBy({ client_id: clientId });
  }

  public async changeDevStatus(
    status: string,
    deviceId: DeviceID,
  ): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findById(deviceId);
    await this.deviceRepository.merge(device, { status_name: status });
    return await this.deviceRepository.save(device);
  }

  public async setRecDevs(record_id: RecordID): Promise<RecordEntity> {
    const rec = await this.recordRepository.findOneBy({ id: record_id });
    const devs = await this.deviceRepository.findBy({ record_id: record_id });

    this.recordRepository.merge(rec, {
      devices: devs,
    });
    return await this.recordRepository.save(rec);
  }

  public async update(
    deviceID: DeviceID,
    dto: UpdateDeviceDto,
  ): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findOneBy({ id: deviceID });
    this.deviceRepository.merge(device, dto);
    return await this.deviceRepository.save(device);
  }
}
