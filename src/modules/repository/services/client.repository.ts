import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClientEntity } from '../../../database/entities/client.entity';
import { ClientID } from '../../../common/types/entity-ids.type';
import { ClientListQueryDto } from '../../clients/models/dto/req/client-list-query.dto';

@Injectable()
export class ClientRepository extends Repository<ClientEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ClientEntity, dataSource.manager);
  }

  public async findAll(
    query: ClientListQueryDto,
  ): Promise<[ClientEntity[], number]> {
    const qb = this.createQueryBuilder('client');

    if (query.search) {
      qb.andWhere('CONCAT(client.name, client.surname) LIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.phone) {
      qb.andWhere('client.phone = :phone', { phone: query.phone });
    }

    if (query.email) {
      qb.andWhere('client.email = :email', { email: query.email });
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(clientId: ClientID): Promise<ClientEntity> {
    const qb = this.createQueryBuilder('client');
    qb.where('client.id = :clientId', { clientId });
    return await qb.getOne();
  }
}
