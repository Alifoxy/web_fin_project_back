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

    if (query.status) {
      qb.andWhere('CONCAT(status.status) LIKE :status');
      qb.setParameter('status', `%${query.status}%`);
    }
    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }

  public async findById(id: string): Promise<StatusEntity> {
    const qb = this.createQueryBuilder('status');

    qb.where('status.id = :id', { id });
    return await qb.getOne();
  }
}
