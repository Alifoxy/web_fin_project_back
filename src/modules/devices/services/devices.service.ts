import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../../repository/services/device.repository';
import { CreateDeviceDto } from '../models/dto/req/create-device-dto';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { ClientRepository } from '../../repository/services/client.repository';
import { DeviceListQueryDto } from '../models/dto/req/device-list-query.dto';
import { UpdateDeviceDto } from "../models/dto/req/update-device.dto";
import { DeviceID } from "../../../common/types/entity-ids.type";
// import { DeviceListQueryDto } from '../models/dto/req/device-list-query.dto';
// import { ClientEntity } from '../../../database/entities/client.entity';
// import { ClientResDto } from '../../clients/models/dto/res/client.res.dto';

@Injectable()
export class DevicesService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly clientRepository: ClientRepository,
  ) {}
  public async create(
    clientPhone: string,
    dto: CreateDeviceDto,
  ): Promise<DeviceEntity> {
    const client = await this.clientRepository.findByPhone(clientPhone);
    return await this.deviceRepository.save(
      this.deviceRepository.create({
        ...dto,
        client_phone: clientPhone,
        client_id: client.id,
        client: client,
      }),
    );
  }

  public async findAll(
    query: DeviceListQueryDto,
  ): Promise<[DeviceEntity[], number]> {
    return await this.deviceRepository.findAll(query);
  }

  public async findOne(clientPhone: string): Promise<DeviceEntity> {
    return await this.deviceRepository.findByCliPhone(clientPhone);
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