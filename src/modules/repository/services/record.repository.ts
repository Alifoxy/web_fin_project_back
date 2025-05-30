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
    const skip = (+query.page - 1) * query.limit;
    qb.leftJoinAndSelect('record.client', 'client');
    qb.leftJoinAndSelect('record.devices', 'devices');

    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }

  public async findByParams(
    query: RecordListQueryDto,
  ): Promise<[RecordEntity[], number]> {
    const qb = this.createQueryBuilder('record');
    const skip = 0;
    qb.leftJoinAndSelect('record.client', 'client');
    qb.leftJoinAndSelect('record.devices', 'devices');

    if (query.cli_phone) {
      qb.andWhere('client.phone = :cli_phone', {
        cli_phone: query.cli_phone,
      });
    }

    if (query.rec_num) {
      qb.andWhere('record.record_num = :rec_num', {
        rec_num: query.rec_num,
      });
    }

    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }
}
