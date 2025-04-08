import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StatusEntity } from '../../../database/entities/status.entity';
import { StatusListQueryDto } from '../../statuses/models/dto/req/status-list-query.dto';

@Injectable()
export class StatusRepository extends Repository<StatusEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StatusEntity, dataSource.manager);
  }

  public async findAll(
    query: StatusListQueryDto,
  ): Promise<[StatusEntity[], number]> {
    const qb = this.createQueryBuilder('status');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
