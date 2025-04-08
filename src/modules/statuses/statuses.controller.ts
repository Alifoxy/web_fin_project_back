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
import { StatusID } from '../../common/types/entity-ids.type';
import { StatusesService } from './services/statuses.service';
import { CreateUpdateStatusDto } from './models/dto/req/create-update-status-dto';
import { StatusesMapper } from './services/statuses.mapper';
import { StatusListQueryDto } from './models/dto/req/status-list-query.dto';
import { StatusListResDto } from './models/dto/res/status-list.res.dto';
import { StatusResDto } from './models/dto/res/status.res.dto';

@Controller('statuses')
export class StatusesController {
  constructor(private statusService: StatusesService) {}

  @Post()
  public async create(
    // @Param('phone') clientPhone: string,
    @Body() dto: CreateUpdateStatusDto,
  ) {
    const result = await this.statusService.create(dto);
    return StatusesMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @Query() query: StatusListQueryDto,
  ): Promise<StatusListResDto> {
    const [entities, total] = await this.statusService.findAll(query);
    return StatusesMapper.toResDtoList(entities, total, query);
  }

  @Get(':statusId')
  public async findOne(
    @Param('statusId', ParseUUIDPipe) statusId: StatusID,
  ): Promise<StatusResDto> {
    const result = await this.statusService.findOne(statusId);
    return StatusesMapper.toResDto(result);
  }

  @Patch(':statusId')
  public async update(
    @Param('statusId', ParseUUIDPipe) statusId: StatusID,
    @Body() dto: CreateUpdateStatusDto,
  ): Promise<StatusResDto> {
    const result = await this.statusService.update(statusId, dto);
    return StatusesMapper.toResDto(result);
  }

  @Delete(':statusId')
  public async remove(@Param('statusId', ParseUUIDPipe) statusId: StatusID) {
    return this.statusService.remove(statusId);
  }
}
