import {
  Body,
  Controller,
  Get,
  Param,
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

  @Get(':phone')
  public async findOne(
    @Param('phone') clientPhone: string,
  ): Promise<ClientResDto> {
    const result = await this.clientsService.findOne(clientPhone);
    return ClientsMapper.toResDto(result);
  }

  @Patch(':phone')
  public async update(
    @Param('phone') clientPhone: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResDto> {
    const result = await this.clientsService.update(
      clientPhone,
      updateClientDto,
    );
    return ClientsMapper.toResDto(result);
  }
}
