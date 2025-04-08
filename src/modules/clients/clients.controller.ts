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

  @Get('phone/:clientPhone')
  public async findOneByPhone(
    @Param('clientPhone') clientPhone: string,
  ): Promise<ClientResDto> {
    const result = await this.clientsService.findOneByPhone(clientPhone);
    return ClientsMapper.toResDto(result);
  }

  @Get(':clientPhone/exists')
  async clientExists(
    @Param('clientPhone') clientPhone: string,
  ): Promise<{ exists: boolean }> {
    const exists = await this.clientsService.clientExists(clientPhone);
    return { exists };
  }

  @Patch(':clientId')
  public async update(
    @Param('clientId', ParseUUIDPipe) clientId: ClientID,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResDto> {
    const result = await this.clientsService.update(clientId, updateClientDto);
    return ClientsMapper.toResDto(result);
  }

  @Delete(':clientId')
  public async remove(@Param('clientId', ParseUUIDPipe) clientId: ClientID) {
    return this.clientsService.remove(clientId);
  }
}
