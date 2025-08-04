import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RecordsService } from './services/records.service';
import { RecordsMapper } from './services/records.mapper';
import { CreateClientDto } from '../clients/models/dto/req/create-client.dto';
import { RecordListQueryDto } from './models/dto/req/record-list-query.dto';
import { RecordListResDto } from './models/dto/res/record-list.res.dto';
import { RecordResDto } from './models/dto/res/record.res.dto';
import { ClientID, RecordID } from '../../common/types/entity-ids.type';
import { RecordListSimpleResDto } from './models/dto/res/record-list-simple.res.dto';
import { CreateDeviceDto } from '../devices/models/dto/req/create-device-dto';
import { RecordParamListResDto } from './models/dto/res/record-param-list.res.dto';
import { ClientsService } from '../clients/services/clients.service';
import { StatusesService } from '../statuses/services/statuses.service';
import { DevicesService } from '../devices/services/devices.service';

@Controller('records')
export class RecordsController {
  constructor(
    private recordsService: RecordsService,
    private clientsService: ClientsService,
    private devicesService: DevicesService,
    private statusesService: StatusesService,
  ) {}

  @Post()
  public async create(
    @Body() rec: { client: CreateClientDto; devices: CreateDeviceDto[] },
  ) {
    const unm_phone = rec.client.phone.replace(/[^0-9]/g, '');
    const base_status = await this.statusesService.IsBaseExists();
    const ex_client = await this.clientsService.IsClientExists(
      unm_phone,
    );
    if (!base_status) {
      throw new BadRequestException('Base status does not exist !');
    } else if (ex_client) {
      throw new ConflictException('Client already exists!');
    } else {
      const result = await this.recordsService.create(rec);
      return RecordsMapper.toResDto(result);
    }
  }

  @Post('/createNew')
  public async createNew(
    @Body() rec: { client: CreateClientDto; devices: CreateDeviceDto[] },
  ) {
    const cli = rec.client;
    const unm_phone = cli.phone.replace(/[^0-9]/g, '');
    await this.clientsService.remove(unm_phone);
    const result = await this.recordsService.create(rec);
    return RecordsMapper.toResDto(result);
  }

  @Post('/joinOld')
  public async joinOld(
    @Body() rec: { client: CreateClientDto; devices: CreateDeviceDto[] },
  ) {
    const result = await this.recordsService.joinOld(rec);
    return RecordsMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @Query() query: RecordListQueryDto,
  ): Promise<RecordListResDto> {
    const [entities, total] = await this.recordsService.findAllRec(query);
    return RecordsMapper.toResDtoList(entities, query.page, total, query);
  }

  @Get('by_params')
  public async findByParams(
    @Query() query: RecordListQueryDto,
  ): Promise<RecordParamListResDto> {
    const [entities, total] = await this.recordsService.findByParams(query);
    return RecordsMapper.toParamResDtoList(entities, total, query);
  }

  @Get(':recordId')
  public async findOne(
    @Param('recordId', ParseUUIDPipe) recordId: RecordID,
  ): Promise<RecordResDto> {
    const result = await this.recordsService.GetRecordById(recordId);
    return RecordsMapper.toResDto(result);
  }

  @Get(':clientId')
  public async findByCliId(
    @Param('clientId', ParseUUIDPipe) clientId: ClientID,
  ): Promise<RecordListSimpleResDto> {
    const result = await this.recordsService.findByCliId(clientId);
    return RecordsMapper.toSimpleResDtoList(result);
  }
}