import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ManufacturerEntity } from '../../../database/entities/manufacturer.entity';
import { ManufacturerListQueryDto } from '../../manufacturers/models/dto/req/manufacturer-list-query.dto';

@Injectable()
export class ManufacturerRepository extends Repository<ManufacturerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ManufacturerEntity, dataSource.manager);
  }

  public async findAll(
    query: ManufacturerListQueryDto,
  ): Promise<[ManufacturerEntity[], number]> {
    const skip = (+query.page - 1) * query.limit;
    const qb = this.createQueryBuilder('manufacturer');
    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }

  public async findByName(
    query: ManufacturerListQueryDto,
  ): Promise<[ManufacturerEntity[], number]> {
    const skip = 0;
    const qb = this.createQueryBuilder('manufacturer');

    if (query.manufacturer) {
      qb.andWhere('CONCAT(manufacturer.manufacturer) LIKE :manufacturer');
      qb.setParameter('manufacturer', `%${query.manufacturer}%`);
    }
    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }
}
