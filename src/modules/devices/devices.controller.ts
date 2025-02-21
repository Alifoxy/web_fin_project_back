import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { ClientListQueryDto } from '../clients/models/dto/req/client-list-query.dto';
import { CreateDeviceDto } from './models/dto/req/create-device-dto';
import { DevicesService } from './services/devices.service';
import { DevicesMapper } from './services/devices.mapper';
import { DeviceListResDto } from './models/dto/res/device-list.res.dto';
import { DeviceResDto } from './models/dto/res/device.res.dto';
import { DeviceListQueryDto } from "./models/dto/req/device-list-query.dto";
import { DeviceID } from "../../common/types/entity-ids.type";
import { UpdateDeviceDto } from "./models/dto/req/update-device.dto";

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Post(':phone')
  public async create(
    @Param('phone') clientPhone: string,
    @Body() dto: CreateDeviceDto,
  ) {
    const result = await this.devicesService.create(clientPhone, dto);
    return DevicesMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @Query() query: DeviceListQueryDto,
  ): Promise<DeviceListResDto> {
    const [entities, total] = await this.devicesService.findAll(query);
    return DevicesMapper.toResDtoList(entities, total, query);
  }

  @Get(':phone')
  public async findOne(clientPhone: string): Promise<DeviceResDto> {
    const result = await this.devicesService.findOne(clientPhone);
    return DevicesMapper.toResDto(result);
  }

  @Patch(':deviceId')
  public async update(
    @Param('deviceId', ParseUUIDPipe) deviceId: DeviceID,
    @Body() dto: UpdateDeviceDto,
  ): Promise<DeviceResDto> {
    const result = await this.devicesService.update(deviceId, dto);
    return DevicesMapper.toResDto(result);
  }
}
