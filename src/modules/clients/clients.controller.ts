import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { ClientsService } from './services/clients.service';
import { ClientID } from '../../common/types/entity-ids.type';
import { ClientResDto } from './models/dto/res/client.res.dto';
import { ClientListQueryDto } from './models/dto/req/client-list-query.dto';
import { CreateClientDto } from './models/dto/req/create-client.dto';
import { ClientListResDto } from './models/dto/res/client-list.res.dto';
import { ClientsMapper } from './services/clients.mapper';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  public async create(@Body() dto: CreateClientDto) {
    const result = await this.clientsService.create(dto);
    return ClientsMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @Query() query: ClientListQueryDto,
  ): Promise<ClientListResDto> {
    const [entities, total] = await this.clientsService.findAll(query);
    return ClientsMapper.toResDtoList(entities, total, query);
  }

  @Get(':clientId')
  public async findOne(
    @Param('clientId', ParseUUIDPipe) clientId: ClientID,
  ): Promise<ClientResDto> {
    const result = await this.clientsService.findOne(clientId);
    return ClientsMapper.toResDto(result);
  }
}
