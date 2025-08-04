import {
  Body, ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ManufacturerID } from '../../common/types/entity-ids.type';
import { CreateUpdateManDto } from './models/dto/req/create-update-manufacturer-dto';
import { ManufacturersService } from './services/manufacturers.service';
import { ManufacturersMapper } from './services/manufacturers.mapper';
import { ManufacturerResDto } from './models/dto/res/manufacturer.res.dto';
import { ManufacturerListQueryDto } from './models/dto/req/manufacturer-list-query.dto';
import { ManufacturerListResDto } from './models/dto/res/manufacturer-list.res.dto';
import { ManufacturerParamListResDto } from './models/dto/res/manufacturer-param-list.res.dto';
import { DevicesService } from '../devices/services/devices.service';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(
    private manufacturerService: ManufacturersService,
    private deviceService: DevicesService,
  ) {}

  @Post()
  public async create(
    @Body() dto: CreateUpdateManDto,
  ): Promise<ManufacturerResDto> {
    const ex_m = await this.manufacturerService.IsManufacturerExists(
      dto.manufacturer,
    );
    if (ex_m) {
      throw new ConflictException(`Manufacturer already exists`);
    } else {
      const result = await this.manufacturerService.create(dto);
      return ManufacturersMapper.toResDto(result);
    }
  }

  @Get('byPage')
  public async findAllByPage(
    @Query() query: ManufacturerListQueryDto,
  ): Promise<ManufacturerListResDto> {
    const [entities, total] = await this.manufacturerService.findAll(query);
    return ManufacturersMapper.toResDtoList(entities, query.page, total, query);
  }

  @Get()
  public async findAll(
    @Query() query: ManufacturerListQueryDto,
  ): Promise<ManufacturerParamListResDto> {
    const [entities, total] = await this.manufacturerService.findByName(query);
    return ManufacturersMapper.toParamResDtoList(entities, total, query);
  }

  @Get('byName')
  public async findByName(
    @Query() query: ManufacturerListQueryDto,
  ): Promise<ManufacturerParamListResDto> {
    const [entities, total] = await this.manufacturerService.findByName(query);
    return ManufacturersMapper.toParamResDtoList(entities, total, query);
  }

  @Delete(':manufacturerId')
  public async remove(
    @Param('manufacturerId', ParseUUIDPipe) manufacturerId: ManufacturerID,
  ) {
    const manufacturers =
      await this.deviceService.findByManufacturer(manufacturerId);
    if (manufacturers.length > 0) {
      throw new ConflictException(
        `This manufacturer is in use, it cannot be deleted!`,
      );
    } else {
      return this.manufacturerService.remove(manufacturerId);
    }
  }
}
