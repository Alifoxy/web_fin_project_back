import { Injectable } from "@nestjs/common";
import { RecordRepository } from "../../repository/services/record.repository";
import { RecordEntity } from "../../../database/entities/record.entity";
import { GenNumHelper } from "../../../common/helpers/gen-num.helper";
import { ClientRepository } from "../../repository/services/client.repository";
import { ClientsService } from "../../clients/services/clients.service";
import { UpdateRecordDto } from "../models/dto/req/update-record.dto";
import { ClientID, RecordID } from "../../../common/types/entity-ids.type";
import { CreateClientDto } from "../../clients/models/dto/req/create-client.dto";
import { ClientEntity } from "../../../database/entities/client.entity";
import { RecordListQueryDto } from "../models/dto/req/record-list-query.dto";
import { DevicesService } from "../../devices/services/devices.service";

@Injectable()
export class RecordsService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly devicesService: DevicesService,
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
  ) {}

  public async create(cli: CreateClientDto): Promise<RecordEntity> {
    const d = new Date(Date.now());
    const num = GenNumHelper.formDate(d);
    const record = await this.recordRepository.save(
      this.recordRepository.create({ record_num: num, client: cli }), //создаем квитанцию в таблице records, сохраняем данные клиента
    );
    const client = record.client;

    // const client = record.client;
    const rec_cli = await this.isClientExist(record, client);
    // this.recordRepository.merge(record, save_rec);
    // const a = await this.recordRepository.save(record);
    // const cli_data = record.client;
    const rec_id = rec_cli.id;
    // return await this.isClientExist(rec, rec.client);

    return await this.findOne(rec_id);
    //проверяем, существует ли клиент в таблице клиентов: если нет, создаем клиента и берем его id, если есть, берем id клиента из таблицы клиентов.

  }

  // Math.random()

  public async findAllRec(
    query: RecordListQueryDto,
  ): Promise<[RecordEntity[], number]> {
    return await this.recordRepository.findAll(query);
  }

  public async findByCliId(client_id: ClientID): Promise<RecordEntity[]> {
    return await this.recordRepository.findBy({ client_id: client_id });
  }
  //
  // public async findOne(record_id: RecordID): Promise<RecordEntity> {
  //   return await this.recordRepository.findOneBy({ id: record_id });
  // }
  //
  // public async isClientExist(client_phone: string): Promise<RecordEntity> {
  //   const cli_found = await clientsService.findOneByPhone(client_phone);
  //   return
  // }
  // public async createRecCli(record: RecordEntity): Promise<RecordEntity> {
  //   const client = await this.clientsService.findOne(record.client_id);
  //   const cli_name = client.name
  //   const rc= record.client
  //   // const client = {
  //   //   name: get_cli.name,
  //   //   surname: get_cli.surname,
  //   //   phone: get_cli.phone,
  //   //   email: get_cli.email,
  //   // };
  //
  //   this.recordRepository.merge({client:cli_name});
  //   return await this.recordRepository.save(record);
  // }
  public async isClientExist(
    record: RecordEntity,
    client: ClientEntity,
  ): Promise<RecordEntity> {
    const get_rec = await this.recordRepository.findOneBy({ id: record.id });
    const cli_found = await this.clientRepository.findOneBy({
      phone: client.phone,
    });
    if (!cli_found) {
      const new_cli = await this.clientRepository.save(
        this.clientRepository.create(client),
      );
      const new_cli_id = new_cli.id;
      this.recordRepository.merge(get_rec, { client_id: new_cli_id }); //если клиента нет, создаем нового клиента в таблице клиентов и вписываем id
      return await this.recordRepository.save(get_rec);
    } else {
      const cli_id = cli_found.id;
      this.recordRepository.merge(get_rec, { client_id: cli_id }); //если клиент существует, берем id клиента и вписываем в квитанцию
      return await this.recordRepository.save(get_rec);
    }
  }

  // public async saveCliRec(record: RecordEntity): Promise<RecordEntity> {
  //   const d = new Date(Date.now());
  //   const num = GenNumHelper.formDate(d);
  //   const record = await this.recordRepository.save(
  //     this.recordRepository.create({ record_num: num, client: cli }), //создаем квитанцию в таблице records, сохраняем данные клиента
  //   );
  //   const cli_found = await this.clientRepository.findOneBy({
  //     phone: client.phone,
  //   });
  //   if (!cli_found) {
  //     const new_cli = await this.clientRepository.save(
  //       this.clientRepository.create(rec.client),
  //     );
  //     const new_cli_id = new_cli.id;
  //     this.recordRepository.merge(rec, { client_id: new_cli_id }); //если клиента нет, создаем нового клиента в таблице клиентов и вписываем id
  //     return await this.recordRepository.save(rec);
  //   } else {
  //     const cli_id = cli_found.id;
  //     this.recordRepository.merge(rec, { client_id: cli_id }); //если клиент существует, берем id клиента и вписываем в квитанцию
  //     return await this.recordRepository.save(rec);
  //   }
  //   return await this.setRecCli(record);
  //   //проверяем, существует ли клиент в таблице клиентов: если нет, создаем клиента и берем его id, если есть, берем id клиента из таблицы клиентов.
  // }

  public async findOne(record_id: RecordID): Promise<RecordEntity> {
    const rec = await this.recordRepository.findOneBy({ id: record_id });
    const cli = await this.clientRepository.findOneBy({ id: rec.client_id });
    this.recordRepository.merge(rec, { client: cli });
    return await this.recordRepository.save(rec);
  }

  public async update(
    recordId: RecordID,
    dto: UpdateRecordDto,
  ): Promise<RecordEntity> {
    const record = await this.recordRepository.findOneBy({ id: recordId });
    this.recordRepository.merge(record, dto);
    return await this.recordRepository.save(record);
  }
}
