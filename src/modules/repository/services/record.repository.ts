import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RecordEntity } from '../../../database/entities/record.entity';
import { RecordListQueryDto } from '../../records/models/dto/req/record-list-query.dto';

@Injectable()
export class RecordRepository extends Repository<RecordEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RecordEntity, dataSource.manager);
  }
  public async findAll(
    query: RecordListQueryDto,
  ): Promise<[RecordEntity[], number]> {
    const qb = this.createQueryBuilder('record');
    qb.leftJoinAndSelect('record.client', 'client');
    qb.leftJoinAndSelect('record.devices', 'devices');

    if (query.cli_phone) {
      qb.andWhere('client.phone = :client', {
        cli_phone: query.cli_phone,
      });
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
