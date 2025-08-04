import { Injectable } from '@nestjs/common';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { DeviceListQueryDto } from '../models/dto/req/device-list-query.dto';
import { DeviceResDto } from '../models/dto/res/device.res.dto';
import { ClientsMapper } from '../../clients/services/clients.mapper';
import { DeviceListResDto } from '../models/dto/res/device-list.res.dto';
import { StatusesMapper } from '../../statuses/services/statuses.mapper';

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

  public static toParamResDtoList(
    data: DeviceEntity[],
    total: number,
    query: DeviceListQueryDto,
  ): DeviceListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toSimpleResDtoList(data: DeviceEntity[]): DeviceResDto[] {
    return data.map(this.toResDto);
  }

  public static toResDto(data: DeviceEntity): DeviceResDto {
    return {
      id: data.id,
      record_id: data.record_id,
      client_id: data.client_id,
      model: data.model,
      equipment: data.equipment,
      break_info: data.break_info,
      status: data.status ? StatusesMapper.toResDto(data.status) : null,
      manufacturer: data.manufacturer,
      result: data.result,
      price: data.price,
      client: data.client ? ClientsMapper.toResDto(data.client) : null,
      created: data.created.toLocaleString(),
      updated: data.updated.toLocaleString(),
    };
  }
}
