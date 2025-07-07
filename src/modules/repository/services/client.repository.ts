import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClientEntity } from '../../../database/entities/client.entity';
import { ClientListQueryDto } from '../../clients/models/dto/req/client-list-query.dto';

@Injectable()
export class ClientRepository extends Repository<ClientEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ClientEntity, dataSource.manager);
  }

  public async findAll(
    query: ClientListQueryDto,
  ): Promise<[ClientEntity[], number]> {
    const skip = (+query.page - 1) * query.limit;
    const qb = this.createQueryBuilder('client');
    qb.leftJoinAndSelect('client.records', 'records');

    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }

  public async findByParams(
    query: ClientListQueryDto,
  ): Promise<[ClientEntity[], number]> {
    const skip = 0;
    const qb = this.createQueryBuilder('client');
    qb.leftJoinAndSelect('client.records', 'records');

    if (query.search) {
      qb.andWhere('CONCAT(client.name, client.surname) LIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.phone_num) {
      qb.andWhere('CONCAT(client.phone) LIKE :phone_num');
      qb.setParameter('phone_num', `%${query.phone_num}%`);
    }

    if (query.email) {
      qb.andWhere('client.email = :email', { email: query.email });
    }
    qb.take(query.limit);
    qb.skip(skip);

    return await qb.getManyAndCount();
  }
}
