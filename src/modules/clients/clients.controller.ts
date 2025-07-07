import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { ClientResDto } from './models/dto/res/client.res.dto';
import { ClientListQueryDto } from './models/dto/req/client-list-query.dto';
import { CreateClientDto } from './models/dto/req/create-client.dto';
import { ClientListResDto } from './models/dto/res/client-list.res.dto';
import { ClientsMapper } from './services/clients.mapper';
import { UpdateClientDto } from './models/dto/req/update-client.dto';
import { ClientID } from '../../common/types/entity-ids.type';
import { ClientParamListResDto } from './models/dto/res/client_param_list.res.dto';

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
    return ClientsMapper.toResDtoList(entities, query.page, total, query);
  }

  @Get('by_params')
  public async findByParams(
    @Query() query: ClientListQueryDto,
  ): Promise<ClientParamListResDto> {
    const [entities, total] = await this.clientsService.findByParams(query);
    return ClientsMapper.toParamResDtoList(entities, total, query);
  }

  @Get(':clientId')
  public async findOne(
    @Param('clientId', ParseUUIDPipe) clientId: ClientID,
  ): Promise<ClientResDto> {
    const result = await this.clientsService.findOne(clientId);
    return ClientsMapper.toResDto(result);
  }

  @Patch(':clientId')
  public async update(
    @Param('clientId', ParseUUIDPipe) clientId: ClientID,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResDto> {
    const result = await this.clientsService.update(clientId, updateClientDto);
    return ClientsMapper.toResDto(result);
  }

  @Delete('phone/:clientPhone')
  public async remove(@Param('clientPhone') clientPhone: string) {
    return this.clientsService.remove(clientPhone);
  }
}
