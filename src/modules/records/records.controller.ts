import {
  BadRequestException,
  Body, ConflictException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query
} from "@nestjs/common";
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
// import { DeviceEntity } from "../../database/entities/device.entity";
// import { ClientEntity } from "../../database/entities/client.entity";

@Controller('records')
export class RecordsController {
  constructor(
    private recordsService: RecordsService,
    private clientsService: ClientsService,
  ) {}

  @Post()
  public async create(
    @Body() rec: { client: CreateClientDto; devices: CreateDeviceDto[] },
  ) {
    const ex_client = await this.clientsService.IsClientExists(
      rec.client.phone,
    );
    if (ex_client) {
      throw new ConflictException(`Client already exists`);
    } else {
      const result = await this.recordsService.create(rec);
      return RecordsMapper.toResDto(result);
    }
    // return RecordsMapper.toResDto(result);
  }

  @Post('/createNew')
  public async createNew(
    @Body() rec: { client: CreateClientDto; devices: CreateDeviceDto[] },
  ) {
    await this.clientsService.remove(rec.client.phone);
    const result = await this.recordsService.createNew(rec);
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
    const result = await this.recordsService.setRecCli(recordId);
    return RecordsMapper.toResDto(result);
  }

  @Get(':clientId')
  public async findByCliId(
    @Param('clientId', ParseUUIDPipe) clientId: ClientID,
  ): Promise<RecordListSimpleResDto> {
    const result = await this.recordsService.findByCliId(clientId);
    return RecordsMapper.toSimpleResDtoList(result);
  }
  //
  // @Patch(':clientId')
  // public async update(
  //   @Param('clientId', ParseUUIDPipe) clientId: ClientID,
  //   @Body() updateClientDto: UpdateClientDto,
  // ): Promise<ClientResDto> {
  //   const result = await this.clientsService.update(clientId, updateClientDto);
  //   return ClientsMapper.toResDto(result);
  // }
  //
  // @Delete(':clientId')
  // public async remove(@Param('clientId', ParseUUIDPipe) clientId: ClientID) {
  //   return this.clientsService.remove(clientId);
  // }
}
