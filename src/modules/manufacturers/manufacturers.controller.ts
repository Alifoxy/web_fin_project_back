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
import { ManufacturerID } from '../../common/types/entity-ids.type';
import { CreateUpdateManufacturerDto } from './models/dto/req/create-update-manufacturer-dto';
import { ManufacturersService } from './services/manufacturers.service';
import { ManufacturersMapper } from './services/manufacturers.mapper';
import { ManufacturerResDto } from './models/dto/res/manufacturer.res.dto';
import { ManufacturerListQueryDto } from './models/dto/req/manufacturer-list-query.dto';
import { ManufacturerListResDto } from './models/dto/res/manufacturer-list.res.dto';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private manufacturerService: ManufacturersService) {}

  @Post()
  public async create(
    // @Param('phone') clientPhone: string,
    @Body() dto: CreateUpdateManufacturerDto,
  ): Promise<ManufacturerResDto> {
    const result = await this.manufacturerService.create(dto);
    return ManufacturersMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @Query() query: ManufacturerListQueryDto,
  ): Promise<ManufacturerListResDto> {
    const [entities, total] = await this.manufacturerService.findAll(query);
    return ManufacturersMapper.toResDtoList(entities, total, query);
  }

  @Get(':manufacturerId')
  public async findOne(
    @Param('manufacturerId', ParseUUIDPipe) manufacturerId: ManufacturerID,
  ): Promise<ManufacturerResDto> {
    const result = await this.manufacturerService.findOne(manufacturerId);
    return ManufacturersMapper.toResDto(result);
  }

  @Patch(':manufacturerId')
  public async update(
    @Param('manufacturerId', ParseUUIDPipe) manufacturerId: ManufacturerID,
    @Body() dto: CreateUpdateManufacturerDto,
  ): Promise<ManufacturerResDto> {
    const result = await this.manufacturerService.update(manufacturerId, dto);
    return ManufacturersMapper.toResDto(result);
  }

  @Delete(':manufacturerId')
  public async remove(
    @Param('manufacturerId', ParseUUIDPipe) manufacturerId: ManufacturerID,
  ) {
    return this.manufacturerService.remove(manufacturerId);
  }
}
