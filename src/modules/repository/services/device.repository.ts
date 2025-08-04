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
    const skip = (+query.page - 1) * query.limit;
    const qb = this.createQueryBuilder('device');
    qb.leftJoinAndSelect('device.client', 'client');
    qb.leftJoinAndSelect('device.record', 'record');
    qb.leftJoinAndSelect('device.status', 'status');

    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }

  public async findByParams(
    query: DeviceListQueryDto,
  ): Promise<[DeviceEntity[], number]> {
    const skip = (+query.page - 1) * query.limit;
    const qb = this.createQueryBuilder('device');
    qb.leftJoinAndSelect('device.client', 'client');
    qb.leftJoinAndSelect('device.record', 'record');
    qb.leftJoinAndSelect('device.status', 'status');
    // qb.leftJoinAndSelect('device.manufacturer', 'manufacturer');

    if (query.search) {
      qb.andWhere('CONCAT(device.model) LIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.client) {
      qb.andWhere('client.phone = :client', { client: query.client });
    }

    if (query.status) {
      qb.andWhere('status.status = :status', { status: query.status });
    }

    if (query.manufacturer) {
      qb.andWhere('device.manufacturer = :manufacturer', {
        manufacturer: query.manufacturer,
      });
    }
    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }

  public async findById(id: string): Promise<DeviceEntity> {
    const qb = this.createQueryBuilder('device');
    qb.leftJoinAndSelect('device.client', 'client');

    qb.where('device.id = :id', { id });
    return await qb.getOne();
  }
}
