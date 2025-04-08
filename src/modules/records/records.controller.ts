import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { RecordsService } from './services/records.service';
// import { CreateRecordDto } from './models/dto/req/create-record-dto';
import { RecordsMapper } from './services/records.mapper';
import { ClientsService } from '../clients/services/clients.service';
import { CreateClientDto } from '../clients/models/dto/req/create-client.dto';
import { RecordListQueryDto } from './models/dto/req/record-list-query.dto';
import { RecordListResDto } from './models/dto/res/record-list.res.dto';
import { RecordResDto } from "./models/dto/res/record.res.dto";
import { RecordID } from "../../common/types/entity-ids.type";

@Controller('records')
export class RecordsController {
  constructor(
    private recordsService: RecordsService,
    private clientsService: ClientsService,
  ) {}

  @Post()
  public async create(@Body() cli: CreateClientDto) {
    const result = await this.recordsService.create(cli);
    // const rec_id = record.id;
    // const cli = record.client;
    // const client = await this.recordsService.createRecCli(rec_id,cli);
    // const client = record.client;
    // const cli_found = await this.clientsService.clientExists(client.phone);
    // if (cli_found === true) {
    //   const cli = await this.clientsService.findOneByPhone(client.phone);
    //   const id = cli.id;
    //   return await this.recordsService.update(record, id);
    // } else {
    //   return await this.clientRepository.save(
    //     this.clientRepository.create(dto),
    //   );
    // }
    return RecordsMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @Query() query: RecordListQueryDto,
  ): Promise<RecordListResDto> {
    const [entities, total] = await this.recordsService.findAllRec(query);
    return RecordsMapper.toResDtoList(entities, total, query);
  }
  //
  @Get(':recordId')
  public async findOne(
    @Param('recordId', ParseUUIDPipe) recordId: RecordID,
  ): Promise<RecordResDto> {
    const result = await this.recordsService.findOne(recordId);
    return RecordsMapper.toResDto(result);
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
