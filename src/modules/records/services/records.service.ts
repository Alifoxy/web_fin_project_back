import { Injectable } from '@nestjs/common';
import { RecordRepository } from '../../repository/services/record.repository';
import { RecordEntity } from '../../../database/entities/record.entity';
import { GenNumHelper } from '../../../common/helpers/gen-num.helper';
import { ClientRepository } from '../../repository/services/client.repository';
import { ClientsService } from '../../clients/services/clients.service';
import { ClientID, RecordID } from '../../../common/types/entity-ids.type';
import { CreateClientDto } from '../../clients/models/dto/req/create-client.dto';
import { ClientEntity } from '../../../database/entities/client.entity';
import { RecordListQueryDto } from '../models/dto/req/record-list-query.dto';
import { DevicesService } from '../../devices/services/devices.service';
import { CreateDeviceDto } from '../../devices/models/dto/req/create-device-dto';
import { DeviceRepository } from '../../repository/services/device.repository';
import { StatusRepository } from '../../repository/services/status.repository';

@Injectable()
export class RecordsService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly devicesService: DevicesService,
    private readonly clientRepository: ClientRepository,
    private readonly recordRepository: RecordRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly statusRepository: StatusRepository,
  ) {}

  public async create(rec: {
    client: CreateClientDto;
    devices: CreateDeviceDto[];
  }): Promise<RecordEntity> {
    const cli = await this.CreateRecordClient(rec.client);
    const record = await this.CreateRecord(cli.id);
    await this.CreateRecordDevices(record.id, cli.id, rec.devices);
    return await this.ReturnRecord(record.id);
  }

  public async CreateRecord(cli: ClientID): Promise<RecordEntity> {
    const client = await this.clientRepository.findOneBy({ id: cli });
    const d = new Date(Date.now());
    const num = GenNumHelper.formDate(d);
    return await this.recordRepository.save(
      this.recordRepository.create({
        record_num: num,
        client_id: client.id,
        is_closed: false,
      }),
    );
  }

  public async CreateRecordClient(
    client: CreateClientDto,
  ): Promise<ClientEntity> {
    return await this.clientsService.create(client);
  }

  public async CreateRecordDevices(
    record: RecordID,
    client: ClientID,
    devices: CreateDeviceDto[],
  ): Promise<void> {
    for (const device of devices) {
      await this.devicesService.create(record, client, device);
    }
  }

  public async ReturnRecord(record: RecordID): Promise<RecordEntity> {
    const rec = await this.recordRepository.findOneBy({ id: record });
    const set_cli = await this.setRecCli(rec.id);
    const set_devs = await this.devicesService.setRecDevs(set_cli.id);
    await this.recordRepository.merge(set_cli, set_devs);
    return await this.recordRepository.save(set_cli);
  }

  public async GetRecordById(record_id: RecordID): Promise<RecordEntity> {
    const rec = await this.recordRepository.findOneBy({ id: record_id });
    const cli = await this.clientRepository.findOneBy({ id: rec.client_id });
    const devs = await this.deviceRepository.findBy({ record_id: rec.id });
    for (const device of devs) {
      const stat = await this.statusRepository.findOneBy({
        id: device.status_id,
      });
      await this.deviceRepository.merge(device, { status: stat });
      await this.deviceRepository.save(device);
    }

    this.recordRepository.merge(rec, {
      client: cli,
      devices: devs,
    });
    return await this.recordRepository.save(rec);
  }

  public async setRecCli(record_id: RecordID): Promise<RecordEntity> {
    const rec = await this.recordRepository.findOneBy({ id: record_id });
    const cli = await this.clientRepository.findOneBy({ id: rec.client_id });

    this.recordRepository.merge(rec, {
      client: cli,
    });
    return await this.recordRepository.save(rec);
  }

  public async joinOld(rec: {
    client: CreateClientDto;
    devices: CreateDeviceDto[];
  }): Promise<RecordEntity> {
    {
      const unm_phone = rec.client.phone.replace(/[^0-9]/g, '');
      const cli = await this.clientRepository.findOneBy({
        phone: unm_phone,
      });
      const record = await this.CreateRecord(cli.id);
      await this.CreateRecordDevices(record.id, cli.id, rec.devices);
      return await this.ReturnRecord(record.id);
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
}
