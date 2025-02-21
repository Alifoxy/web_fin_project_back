import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../repository/services/client.repository';
import { ClientEntity } from '../../../database/entities/client.entity';
import { CreateClientDto } from '../models/dto/req/create-client.dto';
import { ClientListQueryDto } from '../models/dto/req/client-list-query.dto';
import { UpdateClientDto } from '../models/dto/req/update-client.dto';

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

  public async findOne(clientPhone: string): Promise<ClientEntity> {
    return await this.clientRepository.findByPhone(clientPhone);
  }

  public async update(
    clientPhone: string,
    dto: UpdateClientDto,
  ): Promise<ClientEntity> {
    const client = await this.clientRepository.findByPhone(clientPhone);
    this.clientRepository.merge(client, dto);
    return await this.clientRepository.save(client);
  }
}
