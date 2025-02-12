import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../repository/services/client.repository';
import { ClientEntity } from '../../../database/entities/client.entity';
import { ClientID } from '../../../common/types/entity-ids.type';
import { CreateClientDto } from '../models/dto/req/create-client.dto';
import { ClientListQueryDto } from '../models/dto/req/client-list-query.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async create(dto: CreateClientDto): Promise<ClientEntity> {
    return await this.clientRepository.save(this.clientRepository.create(dto));
  }

  public async findAll(
    query: ClientListQueryDto,
  ): Promise<[ClientEntity[], number]> {
    return await this.clientRepository.findAll(query);
  }

  public async findOne(clientId: ClientID): Promise<ClientEntity> {
    return await this.clientRepository.getById(clientId);
  }
}
