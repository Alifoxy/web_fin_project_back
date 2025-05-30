import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../../repository/services/client.repository";
import { ClientEntity } from "../../../database/entities/client.entity";
import { CreateClientDto } from "../models/dto/req/create-client.dto";
import { ClientListQueryDto } from "../models/dto/req/client-list-query.dto";
import { UpdateClientDto } from "../models/dto/req/update-client.dto";
import { ClientID } from "../../../common/types/entity-ids.type";
import { RecordRepository } from "../../repository/services/record.repository";

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
  ) {}

  public async create(dto: CreateClientDto): Promise<ClientEntity> {
    return await this.clientRepository.save(this.clientRepository.create(dto));
  }

  // public async isClientExist(
  //   record: RecordEntity,
  //   client: ClientEntity,
  // ): Promise<RecordEntity> {
  //   const get_rec = await this.recordRepository.findOneBy({ id: record.id });
  //   const cli_found = await this.clientRepository.findOneBy({
  //     phone: client.phone,
  //   });
  //   if (!cli_found) {
  //     const new_cli = await this.clientRepository.save(
  //       this.clientRepository.create(client),
  //     );
  //     const new_cli_id = new_cli.id;
  //     this.recordRepository.merge(get_rec, { client_id: new_cli_id }); //если клиента нет, создаем нового клиента в таблице клиентов и вписываем id
  //     return await this.recordRepository.save(get_rec);
  //   } else {
  //     const cli_id = cli_found.id;
  //     this.recordRepository.merge(get_rec, { client_id: cli_id }); //если клиент существует, берем id клиента и вписываем в квитанцию
  //     return await this.recordRepository.save(get_rec);
  //   }
  // }

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

  // public async findOneByPhone(phone: string): Promise<ClientEntity> {
  //   return await this.clientRepository.findOne({ where: { phone } });
  // }

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

  public async remove(clientPhone: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOneBy({
      phone: clientPhone,
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
