import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../repository/services/client.repository';
import { ClientEntity } from '../../../database/entities/client.entity';
import { CreateClientDto } from '../models/dto/req/create-client.dto';
import { ClientListQueryDto } from '../models/dto/req/client-list-query.dto';
import { UpdateClientDto } from '../models/dto/req/update-client.dto';
import { ClientID } from '../../../common/types/entity-ids.type';
import { RecordRepository } from '../../repository/services/record.repository';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
  ) {}

  public async create(dto: CreateClientDto): Promise<ClientEntity> {
    const unm_phone = dto.phone.replace(/[^0-9]/g, '');
    return await this.clientRepository.save(
      this.clientRepository.create({
        ...dto,
        phone: unm_phone,
      }),
    );
  }

  public async findAll(
    query: ClientListQueryDto,
  ): Promise<[ClientEntity[], number]> {
    return await this.clientRepository.findAll(query);
  }

  public async findByParams(
    query: ClientListQueryDto,
  ): Promise<[ClientEntity[], number]> {
    return await this.clientRepository.findByParams(query);
  }

  public async findOne(clientId: ClientID): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({ id: clientId });
    const rec = await this.recordRepository.findBy({ client_id: clientId });

    this.clientRepository.merge(client, { records: rec });
    return await this.clientRepository.save(client);
  }

  public async update(
    clientId: ClientID,
    dto: UpdateClientDto,
  ): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({
      id: clientId,
    });
    this.clientRepository.merge(client, dto);
    return await this.clientRepository.save(client);
  }

  public async remove(cli_phone: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({
      phone: cli_phone,
    });
    const records = await this.recordRepository.findBy({
      client_id: client.id,
    });
    await this.recordRepository.remove(records);
    return this.clientRepository.remove(client);
  }

  public async IsClientExists(client: string): Promise<boolean> {
    const cli = await this.clientRepository.findOneBy({
      phone: client,
    });
    return !!cli;
  }
}
