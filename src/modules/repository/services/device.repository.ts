import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { DeviceListQueryDto } from '../../devices/models/dto/req/device-list-query.dto';

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
    qb.leftJoinAndSelect('device.status', 'status');
    qb.leftJoinAndSelect('device.manufacturer', 'manufacturer');

    if (query.search) {
      qb.andWhere('CONCAT(device.model) LIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.phone) {
      qb.andWhere('device.phone = :phone', {
        phone: query.phone,
      });
    }

    if (query.client) {
      qb.andWhere('client.surname = :client', {
        client: query.client,
      });
    }

    if (query.status) {
      qb.andWhere('status.name = :status', {
        status: query.status,
      });
    }

    if (query.manufacturer) {
      qb.andWhere('manufacturer.name = :manufacturer', {
        manufacturer: query.manufacturer,
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
