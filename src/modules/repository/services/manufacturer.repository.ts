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
    const qb = this.createQueryBuilder('manufacturer');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
