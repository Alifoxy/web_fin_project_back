import { Injectable } from '@nestjs/common';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { DeviceListQueryDto } from '../models/dto/req/device-list-query.dto';
import { DeviceResDto } from '../models/dto/res/device.res.dto';
import { ClientsMapper } from '../../clients/services/clients.mapper';
import { DeviceListResDto } from '../models/dto/res/device-list.res.dto';
import { DeviceParamListResDto } from '../models/dto/res/device_param_list.res.dto';
import { ChangeDeviceStatusResDto } from "../models/dto/res/change_device_status.res.dto";

@Injectable()
export class DevicesMapper {
  public static toResDtoList(
    data: DeviceEntity[],
    page: string,
    total: number,
    query: DeviceListQueryDto,
  ): DeviceListResDto {
    return { data: data.map(this.toResDto), page, total, ...query };
  }

  public static toSimpleResDtoList(data: DeviceEntity[]): DeviceResDto[] {
    return data.map(this.toResDto);
  }

  public static toParamResDtoList(
    data: DeviceEntity[],
    total: number,
    query: DeviceListQueryDto,
  ): DeviceParamListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: DeviceEntity): DeviceResDto {
    return {
      id: data.id,
      record_id: data.record_id,
      client_id: data.client_id,
      model: data.model,
      equipment: data.equipment,
      break_info: data.break_info,
      status_name: data.status_name,
      manufacturer_name: data.manufacturer_name,
      client: data.client ? ClientsMapper.toResDto(data.client) : null,
      created: data.created,
      updated: data.updated,
    };
  }

  public static toStatusChangeResDto(
    data: ChangeDeviceStatusResDto,
  ): ChangeDeviceStatusResDto {
    return {
      id: data.id,
      status: data.status,
    };
  }
}
