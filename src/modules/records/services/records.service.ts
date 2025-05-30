import { Injectable } from '@nestjs/common';
import { RecordRepository } from '../../repository/services/record.repository';
import { RecordEntity } from '../../../database/entities/record.entity';
import { GenNumHelper } from '../../../common/helpers/gen-num.helper';
import { ClientRepository } from '../../repository/services/client.repository';
import { ClientsService } from '../../clients/services/clients.service';
import { UpdateRecordDto } from '../models/dto/req/update-record.dto';
import { ClientID, RecordID } from '../../../common/types/entity-ids.type';
import { CreateClientDto } from '../../clients/models/dto/req/create-client.dto';
import { ClientEntity } from '../../../database/entities/client.entity';
import { RecordListQueryDto } from '../models/dto/req/record-list-query.dto';
import { DevicesService } from '../../devices/services/devices.service';
import { CreateDeviceDto } from '../../devices/models/dto/req/create-device-dto';
import { DeviceRepository } from '../../repository/services/device.repository';
import { DeviceEntity } from '../../../database/entities/device.entity';
import e from 'express';
// import { DeviceEntity } from '../../../database/entities/device.entity';

@Injectable()
export class RecordsService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly devicesService: DevicesService,
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
    private readonly deviceRepository: DeviceRepository,
  ) {}

  public async create(rec: {
    client: CreateClientDto;
    devices: CreateDeviceDto[];
  }): Promise<RecordEntity> {
    const d = new Date(Date.now());
    const num = GenNumHelper.formDate(d);
    const record = await this.recordRepository.save(
      this.recordRepository.create({
        record_num: num,
        client: rec.client,
        devices: rec.devices,
      }),
    );
    const devices = record.devices;
    const client = record.client;
    const new_cli = await this.RecordClientCreate(record, client);
    await this.devicesService.create(new_cli, devices);
    const set_cli = await this.setRecCli(new_cli.id);
    const set_devs = await this.devicesService.setRecDevs(set_cli.id);
    this.recordRepository.merge(set_cli, set_devs);
    return await this.recordRepository.save(set_cli);

    // return await this.createCheckRecord(client, devices);

    // const cli = await this.clientRepository.findOneBy({
    //   phone: client.phone,
    // });
  }

  // public async createCheckRecord(
  //   cli: ClientEntity,
  //   devs: DeviceEntity[],
  // ): Promise<RecordEntity | string> {
  //   const ex_client = await this.clientsService.IsClientExists(cli);
  //
  //   if (ex_client == false) {
  //     return await this.createNew(cli, devs);
  //     // const devices = record.devices;
  //     // const client = record.client;
  //     // const rec_cli = await this.RecordClientCreate(record, client);
  //     // await this.devicesService.create(rec_cli, devices);
  //     // const set_cli = await this.setRecCli(rec_cli.id);
  //     // const set_devs = await this.devicesService.setRecDevs(set_cli.id);
  //     // this.recordRepository.merge(set_cli, set_devs);
  //     // return await this.recordRepository.save(set_cli);
  //   } else {
  //     return 'client already exists!';
  //   }
  // }

  public async createNew(
    rec: {
      client: CreateClientDto;
      devices: CreateDeviceDto[];
    },
    // cli: ClientEntity,
    // devs: DeviceEntity[],
  ): Promise<RecordEntity> {
    const d = new Date(Date.now());
    const num = GenNumHelper.formDate(d);
    const record = await this.recordRepository.save(
      this.recordRepository.create({
        record_num: num,
        client: rec.client,
        devices: rec.devices,
      }), //создаем квитанцию в таблице records, сохраняем данные клиента
    );
    const devices = record.devices;
    const client = record.client;

    // await this.clientsService.remove(client.phone);

    const new_cli = await this.RecordClientCreate(record, client);
    await this.devicesService.create(new_cli, devices);
    const set_cli = await this.setRecCli(new_cli.id);
    const set_devs = await this.devicesService.setRecDevs(set_cli.id);
    this.recordRepository.merge(set_cli, set_devs);
    return await this.recordRepository.save(set_cli);
  }

  public async joinOld(rec: {
    client: CreateClientDto;
    devices: CreateDeviceDto[];
  }): Promise<RecordEntity> {
    {
      const d = new Date(Date.now());
      const num = GenNumHelper.formDate(d);
      const record = await this.recordRepository.save(
        this.recordRepository.create({
          record_num: num,
          client: rec.client,
          devices: rec.devices,
        }),
      );
      const devices = record.devices;
      const client = record.client;

      const join_cli = await this.RecordClientJoin(record, client);

      await this.devicesService.create(join_cli, devices);
      const set_cli = await this.setRecCli(join_cli.id);
      const set_devs = await this.devicesService.setRecDevs(set_cli.id);
      this.recordRepository.merge(set_cli, set_devs);
      return await this.recordRepository.save(set_cli);
    }
  }

  public async findAllRec(
    query: RecordListQueryDto,
  ): Promise<[RecordEntity[], number]> {
    return await this.recordRepository.findAll(query);
  }

  public async findByParams(
    query: RecordListQueryDto,
  ): Promise<[RecordEntity[], number]> {
    return await this.recordRepository.findByParams(query);
  }

  public async findByCliId(client_id: ClientID): Promise<RecordEntity[]> {
    return await this.recordRepository.findBy({ client_id: client_id });
  }

  public async RecordClientJoin(
    record: RecordEntity,
    client: ClientEntity,
  ): Promise<RecordEntity> {
    const get_rec = await this.recordRepository.findOneBy({ id: record.id });
    const cli_found = await this.clientRepository.findOneBy({
      phone: client.phone,
    });
    const cli_id = cli_found.id;
    this.recordRepository.merge(get_rec, { client_id: cli_id }); //если клиента нет, создаем нового клиента в таблице клиентов и вписываем id
    return await this.recordRepository.save(get_rec);
  }

  public async RecordClientCreate(
    record: RecordEntity,
    client: ClientEntity,
  ): Promise<RecordEntity> {
    const get_rec = await this.recordRepository.findOneBy({ id: record.id });
    const new_cli = await this.clientRepository.save(
      this.clientRepository.create(client),
    );
    const new_cli_id = new_cli.id;
    this.recordRepository.merge(get_rec, { client_id: new_cli_id }); //если клиента нет, создаем нового клиента в таблице клиентов и вписываем id
    return await this.recordRepository.save(get_rec);
  }

  public async setRecCli(record_id: RecordID): Promise<RecordEntity> {
    const rec = await this.recordRepository.findOneBy({ id: record_id });
    const cli = await this.clientRepository.findOneBy({ id: rec.client_id });
    const devs = await this.deviceRepository.findBy({ record_id: record_id });
    this.recordRepository.merge(rec, {
      client: cli,
      devices: devs,
    });
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
