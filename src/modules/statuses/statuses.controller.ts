import {
  Body, ConflictException,
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
import { StatusParamListResDto } from "./models/dto/res/status-param-list.res.dto";

@Controller('statuses')
export class StatusesController {
  constructor(private statusService: StatusesService) {}

  @Post()
  public async create(@Body() dto: CreateUpdateStatusDto) {
    const ex_s = await this.statusService.IsStatusExists(dto.status);
    if (ex_s) {
      throw new ConflictException(`Status already exists`);
    } else {
      const result = await this.statusService.create(dto);
      return StatusesMapper.toResDto(result);
    }
  }

  @Get()
  public async findAll(
    @Query() query: StatusListQueryDto,
  ): Promise<StatusParamListResDto> {
    const [entities, total] = await this.statusService.findByName(query);
    return StatusesMapper.toParamResDtoList(entities, total, query);
  }

  @Get('byPage')
  public async findAllByPage(
    @Query() query: StatusListQueryDto,
  ): Promise<StatusListResDto> {
    const [entities, total] = await this.statusService.findAll(query);
    return StatusesMapper.toResDtoList(entities, query.page, total, query);
  }

  @Get('byName')
  public async findByName(
    @Query() query: StatusListQueryDto,
  ): Promise<StatusParamListResDto> {
    const [entities, total] = await this.statusService.findByName(query);
    return StatusesMapper.toParamResDtoList(entities, total, query);
  }

  @Delete(':statusId')
  public async remove(@Param('statusId', ParseUUIDPipe) statusId: StatusID) {
    return this.statusService.remove(statusId);
  }

  // @Get(':statusId')
  // public async findOne(
  //   @Param('statusId', ParseUUIDPipe) statusId: StatusID,
  // ): Promise<StatusResDto> {
  //   const result = await this.statusService.findOne(statusId);
  //   return StatusesMapper.toResDto(result);
  // }
  //
  // @Patch(':statusId')
  // public async update(
  //   @Param('statusId', ParseUUIDPipe) statusId: StatusID,
  //   @Body() dto: CreateUpdateStatusDto,
  // ): Promise<StatusResDto> {
  //   const result = await this.statusService.update(statusId, dto);
  //   return StatusesMapper.toResDto(result);
  // }

}
