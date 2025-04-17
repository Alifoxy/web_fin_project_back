import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../repository/services/client.repository';
import { ClientEntity } from '../../../database/entities/client.entity';
import { CreateClientDto } from '../models/dto/req/create-client.dto';
import { ClientListQueryDto } from '../models/dto/req/client-list-query.dto';
import { UpdateClientDto } from '../models/dto/req/update-client.dto';
import { ClientID, RecordID } from "../../../common/types/entity-ids.type";
import { RecordEntity } from '../../../database/entities/record.entity';
import { RecordRepository } from '../../repository/services/record.repository';
import { ClientResDto } from "../models/dto/res/client.res.dto";

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
  ) {}

  public async create(dto: CreateClientDto): Promise<ClientEntity> {
    return await this.clientRepository.save(this.clientRepository.create(dto));
  }

  public async findAll(
    query: ClientListQueryDto,
  ): Promise<[ClientEntity[], number]> {
    return await this.clientRepository.findAll(query);
  }

  public async findOne(clientId: ClientID): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({ id: clientId });
    const rec = await this.recordRepository.findBy({ client_id: clientId });

    this.clientRepository.merge(client, { records: rec });
    return await this.clientRepository.save(client);
  }

  public async findOneByPhone(clientPhone: string): Promise<ClientEntity> {
    return await this.clientRepository.findOneBy({ phone: clientPhone });
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

  public async remove(clientId: ClientID): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({
      id: clientId,
    });
    return this.clientRepository.remove(client);
  }

  public async clientExists(clientPhone: string): Promise<boolean> {
    const client = await this.clientRepository.findOneBy({
      phone: clientPhone,
    });
    return !!client;
  }
}
