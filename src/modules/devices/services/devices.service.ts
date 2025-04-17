import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../../repository/services/device.repository';
import { RecordRepository } from '../../repository/services/record.repository';
import { CreateDeviceDto } from '../models/dto/req/create-device-dto';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { ClientRepository } from '../../repository/services/client.repository';
import { DeviceListQueryDto } from '../models/dto/req/device-list-query.dto';
import { UpdateDeviceDto } from '../models/dto/req/update-device.dto';
import { DeviceID, RecordID } from '../../../common/types/entity-ids.type';

@Injectable()
export class DevicesService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
  ) {}
  public async create(
    recordId: RecordID,
    dto: DeviceListQueryDto,
  ): Promise<DeviceEntity> {
    const record = await this.recordRepository.findOneBy({ id: recordId });
    return await this.deviceRepository.save(
      this.deviceRepository.create({
        ...dto,
        record: record.id,
        client_id: record.client_id,
      }),
    );
  }

  public async findAll(
    query: DeviceListQueryDto,
  ): Promise<[DeviceEntity[], number]> {
    return await this.deviceRepository.findAll(query);
  }

  public async findOne(clientPhone: string): Promise<DeviceEntity> {
    return await this.deviceRepository.findOneBy({ phone: clientPhone });
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
