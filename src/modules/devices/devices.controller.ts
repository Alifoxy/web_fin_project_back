import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DevicesService } from './services/devices.service';
import { DevicesMapper } from './services/devices.mapper';
import { DeviceListResDto } from './models/dto/res/device-list.res.dto';
import { DeviceResDto } from './models/dto/res/device.res.dto';
import { DeviceListQueryDto } from './models/dto/req/device-list-query.dto';
import { ClientID, DeviceID } from '../../common/types/entity-ids.type';
import { UpdateDeviceDto } from './models/dto/req/update-device.dto';
import { ChangeDeviceStatusReqDto } from './models/dto/req/change_device_status.req.dto';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Patch(':deviceId/changeStatus')
  public async changeStatus(
    @Body() statusDto: ChangeDeviceStatusReqDto,
    @Param('deviceId', ParseUUIDPipe) deviceId: DeviceID,
  ): Promise<DeviceResDto> {
    const result = await this.devicesService.changeDevStatus(
      statusDto.status,
      deviceId,
    );
    return DevicesMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @Query() query: DeviceListQueryDto,
  ): Promise<DeviceListResDto> {
    const [entities, total] = await this.devicesService.findAll(query);
    return DevicesMapper.toResDtoList(entities, query.page, total, query);
  }

  @Get('by_params')
  public async findByParams(
    @Query() query: DeviceListQueryDto,
  ): Promise<DeviceListResDto> {
    const [entities, total] = await this.devicesService.findByParams(query);
    return DevicesMapper.toResDtoList(entities, query.page, total, query);
  }

  @Get(':deviceId')
  public async findOne(
    @Param('deviceId', ParseUUIDPipe) deviceId: DeviceID,
  ): Promise<DeviceResDto> {
    const result = await this.devicesService.findOneById(deviceId);
    return DevicesMapper.toResDto(result);
  }

  @Get(':clientId')
  public async findOneByCli(@Param('clientId', ParseUUIDPipe) clientId: ClientID,): Promise<DeviceResDto> {
    const result = await this.devicesService.findOne(clientId);
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
