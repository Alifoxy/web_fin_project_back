import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { DeviceListQueryDto } from '../../devices/models/dto/req/device-list-query.dto';
import { IDeviceData } from '../../devices/models/interfaces/device-data.interface';
import { IClientData } from '../../clients/models/interfaces/client-data.interface';

@Injectable()
export class DeviceRepository extends Repository<DeviceEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DeviceEntity, dataSource.manager);
  }

  public async findAll(
    query: DeviceListQueryDto,
  ): Promise<[DeviceEntity[], number]> {
    const qb = this.createQueryBuilder('device');
    qb.leftJoinAndSelect('device.client', 'client');

    if (query.search) {
      qb.andWhere('CONCAT(device.model, device.equipment) LIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.client_phone) {
      qb.andWhere('device.client_phone = :client_phone', {
        client_phone: query.client_phone,
      });
    }

    if (query.status) {
      qb.andWhere('device.status = :status', {
        status: query.status,
      });
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByCliPhone(clientPhone: string): Promise<DeviceEntity> {
    const qb = this.createQueryBuilder('device');
    qb.leftJoinAndSelect('device.client', 'client');

    qb.where('device.client_phone = :clientPhone', { clientPhone });
    return await qb.getOne();
  }
}
