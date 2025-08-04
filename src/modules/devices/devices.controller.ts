import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { DevicesService } from './services/devices.service';
import { DevicesMapper } from './services/devices.mapper';
import { DeviceListResDto } from './models/dto/res/device-list.res.dto';
import { DeviceResDto } from './models/dto/res/device.res.dto';
import { DeviceListQueryDto } from './models/dto/req/device-list-query.dto';
import {
  ClientID,
  DeviceID,
  RecordID,
} from '../../common/types/entity-ids.type';
import { ChangeDeviceStatusReqDto } from './models/dto/req/change_device_status.req.dto';
import { ChangeDeviceManufacturerReqDto } from './models/dto/req/change_device_manufacturer.req.dto';
import { StatusesService } from '../statuses/services/statuses.service';
import { ChangeDeviceResultReqDto } from './models/dto/req/change_device_result.req.dto';
import { ChangeDevicePriceReqDto } from './models/dto/req/change_device_price.req.dto';

@Controller('devices')
export class DevicesController {
  constructor(
    private devicesService: DevicesService,
    private statusService: StatusesService,
  ) {}

  @Patch(':deviceId/changeStatus')
  public async changeStatus(
    @Body() statusDto: ChangeDeviceStatusReqDto,
    @Param('deviceId', ParseUUIDPipe) deviceId: DeviceID,
  ): Promise<DeviceResDto> {
    const device = await this.devicesService.findOneById(deviceId);
    const required = await this.statusService.CheckManufacturerRequired(
      statusDto.status,
    );
    if ((device.manufacturer === null || '') && required) {
      throw new ConflictException(`This status requires manufacturer`);
    } else {
      const result = await this.devicesService.changeDevStatus(
        statusDto.status,
        deviceId,
      );
      return DevicesMapper.toResDto(result);
    }
  }

  @Patch(':deviceId/changeManufacturer')
  public async changeManufacturer(
    @Body() manufacturerDto: ChangeDeviceManufacturerReqDto,
    @Param('deviceId', ParseUUIDPipe) deviceId: DeviceID,
  ): Promise<DeviceResDto> {
    const result = await this.devicesService.changeDevManufacturer(
      manufacturerDto.manufacturer,
      deviceId,
    );
    return DevicesMapper.toResDto(result);
  }

  @Patch(':deviceId/changeResult')
  public async changeResult(
    @Body() resultDto: ChangeDeviceResultReqDto,
    @Param('deviceId', ParseUUIDPipe) deviceId: DeviceID,
  ): Promise<DeviceResDto> {
    const res = await this.devicesService.changeDevResult(resultDto, deviceId);
    return DevicesMapper.toResDto(res);
  }

  @Patch(':deviceId/changePrice')
  public async changePrice(
    @Body() priceDto: ChangeDevicePriceReqDto,
    @Param('deviceId', ParseUUIDPipe) deviceId: DeviceID,
  ): Promise<DeviceResDto> {
    const result = await this.devicesService.changeDevPrice(priceDto, deviceId);
    return DevicesMapper.toResDto(result);
  }

  @Patch(':deviceId/closeDevice')
  public async closeDevice(
    @Param('deviceId', ParseUUIDPipe) deviceId: DeviceID,
  ): Promise<DeviceResDto> {
    await this.devicesService.closeDevice(deviceId);
    const rec_id = await this.devicesService.findOneById(deviceId);
    const fin = await this.devicesService.allDevicesFinished(rec_id.record_id);
    if (fin === true) {
      await this.devicesService.closeDeviceRecord(deviceId);
      return DevicesMapper.toResDto(rec_id);
    } else {
      return DevicesMapper.toResDto(rec_id);
    }
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

  @Get('set/:recordId')
  public async setDevsRecId(
    @Param('recordId', ParseUUIDPipe) recordId: RecordID,
  ): Promise<DeviceResDto[]> {
    const result = await this.devicesService.setStatuses(recordId);
    return DevicesMapper.toSimpleResDtoList(result);
  }

  @Get(':clientId')
  public async findOneByCli(
    @Param('clientId', ParseUUIDPipe) clientId: ClientID,
  ): Promise<DeviceResDto> {
    const result = await this.devicesService.findOne(clientId);
    return DevicesMapper.toResDto(result);
  }
}
