import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../../repository/services/device.repository';
import { RecordRepository } from '../../repository/services/record.repository';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { ClientRepository } from '../../repository/services/client.repository';
import { DeviceListQueryDto } from '../models/dto/req/device-list-query.dto';
import {
  ClientID,
  DeviceID, ManufacturerID,
  RecordID, StatusID
} from "../../../common/types/entity-ids.type";
import { RecordEntity } from '../../../database/entities/record.entity';
import { StatusRepository } from '../../repository/services/status.repository';
import { CreateDeviceDto } from '../models/dto/req/create-device-dto';
import { ManufacturerRepository } from '../../repository/services/manufacturer.repository';
import { ChangeDeviceResultReqDto } from '../models/dto/req/change_device_result.req.dto';
import { ChangeDevicePriceReqDto } from '../models/dto/req/change_device_price.req.dto';

@Injectable()
export class DevicesService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
    private readonly statusRepository: StatusRepository,
    private readonly manufacturerRepository: ManufacturerRepository,
  ) {}
  public async create(
    record: RecordID,
    client: ClientID,
    device: CreateDeviceDto,
  ): Promise<DeviceEntity> {
    const rec = await this.recordRepository.findOneBy({ id: record });
    // const client = await this.clientRepository.findOneBy({
    //   id: record.client_id,
    // });
    const baseStat = await this.statusRepository.findOneBy({
      is_default: true,
    });

    return await this.deviceRepository.save(
      this.deviceRepository.create({
        record_id: record,
        client_id: rec.client_id,
        model: device.model,
        equipment: device.equipment,
        break_info: device.break_info,
        status_id: baseStat.id,
        // manufacturer: '',
        // result: '',
        // price: '',
      }),
    );
  }

  public async setStatuses(rec: RecordID): Promise<DeviceEntity[]> {
    const devs = await this.deviceRepository.findBy({ record_id: rec });
    for (const device of devs) {
      const stat = await this.statusRepository.findOneBy({
        id: device.status_id,
      });
      await this.deviceRepository.merge(device, { status: stat });
      await this.deviceRepository.save(device);
    }
    return devs;
  }

  public async findAll(
    query: DeviceListQueryDto,
  ): Promise<[DeviceEntity[], number]> {
    return await this.deviceRepository.findAll(query);
  }

  public async findByStatus(status_id: StatusID): Promise<DeviceEntity[]> {
    return await this.deviceRepository.findBy({ status_id });
  }

  public async findByManufacturer(
    manufacturer_id: ManufacturerID,
  ): Promise<DeviceEntity[]> {
    const man = await this.manufacturerRepository.findOneBy({
      id: manufacturer_id,
    });
    return await this.deviceRepository.findBy({
      manufacturer: man.manufacturer,
    });
  }

  public async findByParams(
    query: DeviceListQueryDto,
  ): Promise<[DeviceEntity[], number]> {
    return await this.deviceRepository.findByParams(query);
  }

  public async findOneById(deviceId: DeviceID): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findOneBy({ id: deviceId });
    const status = await this.statusRepository.findById(device.status_id);
    const client = await this.clientRepository.findOneBy({
      id: device.client_id,
    });
    await this.deviceRepository.merge(device, {
      client: client,
      status: status,
    });
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
    const stat = await this.statusRepository.findOneBy({ status: status });
    await this.deviceRepository.merge(device, { status_id: stat.id });
    return await this.deviceRepository.save(device);
  }

  public async closeDevice(deviceId: DeviceID): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findById(deviceId);
    const status = await this.statusRepository.findOneBy({
      is_final: true,
    });

    await this.deviceRepository.merge(device, {
      status: status,
    });
    return await this.deviceRepository.save(device);
  }

  public async closeDeviceRecord(deviceId: DeviceID): Promise<DeviceEntity> {
    const dev = await this.findOneById(deviceId);
    const record = await this.recordRepository.findOneBy({ id: dev.record_id });
    this.recordRepository.merge(record, { is_closed: true });
    await this.recordRepository.save(record);
    return dev;
  }

  public async allDevicesFinished(recordId: RecordID): Promise<boolean> {
    const fin_status = await this.statusRepository.findOneBy({
      is_final: true,
    });
    const devices = await this.deviceRepository.findBy({ record_id: recordId });
    return devices.every((dev) => dev.status_id === fin_status.id);
  }

  public async changeDevManufacturer(
    manufacturer: string,
    deviceId: DeviceID,
  ): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findById(deviceId);
    const man = await this.manufacturerRepository.findOneBy({
      manufacturer: manufacturer,
    });
    if (manufacturer === '') {
      await this.deviceRepository.merge(device, {
        manufacturer: '',
      });
      return await this.deviceRepository.save(device);
    } else {
      await this.deviceRepository.merge(device, {
        manufacturer: man.manufacturer,
      });
      return await this.deviceRepository.save(device);
    }
  }

  public async changeDevResult(
    res: ChangeDeviceResultReqDto,
    deviceId: DeviceID,
  ): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findById(deviceId);
    const stat = await this.statusRepository.findOneBy({
      id: device.status_id,
    });
    await this.deviceRepository.merge(device, {
      result: res.result,
    });
    const dev = await this.deviceRepository.save(device);
    await this.deviceRepository.merge(dev, {
      status: stat,
    });
    return await this.deviceRepository.save(dev);
  }

  public async changeDevPrice(
    price: ChangeDevicePriceReqDto,
    deviceId: DeviceID,
  ): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findById(deviceId);
    const stat = await this.statusRepository.findOneBy({
      id: device.status_id,
    });
    await this.deviceRepository.merge(device, {
      price: price.price,
    });
    const dev = await this.deviceRepository.save(device);
    await this.deviceRepository.merge(dev, {
      status: stat,
    });
    return await this.deviceRepository.save(dev);
  }

  public async setRecDevs(record_id: RecordID): Promise<RecordEntity> {
    const rec = await this.recordRepository.findOneBy({ id: record_id });
    const devs = await this.deviceRepository.findBy({ record_id: rec.id });
    for (const device of devs) {
      const stat = await this.statusRepository.findOneBy({
        id: device.status_id,
      });
      await this.deviceRepository.merge(device, { status: stat });
      await this.deviceRepository.save(device);
    }
    this.recordRepository.merge(rec, {
      devices: devs,
    });
    return await this.recordRepository.save(rec);
  }
}
