import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StatusEntity } from '../../../database/entities/status.entity';
import { StatusListQueryDto } from '../../statuses/models/dto/req/status-list-query.dto';
import { ManufacturerListQueryDto } from "../../manufacturers/models/dto/req/manufacturer-list-query.dto";
import { ManufacturerEntity } from "../../../database/entities/manufacturer.entity";

@Injectable()
export class StatusRepository extends Repository<StatusEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StatusEntity, dataSource.manager);
  }

  public async findAll(
    query: StatusListQueryDto,
  ): Promise<[StatusEntity[], number]> {
    const skip = (+query.page - 1) * query.limit;
    const qb = this.createQueryBuilder('status');
    // qb.leftJoinAndSelect('status.devices', 'devices');

    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }

  public async findByName(
    query: StatusListQueryDto,
  ): Promise<[StatusEntity[], number]> {
    const skip = 0;
    const qb = this.createQueryBuilder('status');
    // qb.leftJoinAndSelect('status.devices', 'devices');

    if (query.status) {
      qb.andWhere('CONCAT(status.status) LIKE :status');
      qb.setParameter('status', `%${query.status}%`);
    }
    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }
}
