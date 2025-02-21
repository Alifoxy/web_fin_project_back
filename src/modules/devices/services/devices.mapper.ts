import { Injectable } from '@nestjs/common';
import { DeviceEntity } from '../../../database/entities/device.entity';
import { DeviceListQueryDto } from '../models/dto/req/device-list-query.dto';
import { DeviceResDto } from '../models/dto/res/device.res.dto';
import { ClientsMapper } from '../../clients/services/clients.mapper';
import { DeviceListResDto } from '../models/dto/res/device-list.res.dto';

@Injectable()
export class DevicesMapper {
  public static toResDtoList(
    data: DeviceEntity[],
    total: number,
    query: DeviceListQueryDto,
  ): DeviceListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: DeviceEntity): DeviceResDto {
    return {
      id: data.id,
      model: data.model,
      equipment: data.equipment,
      break_info: data.break_info,
      status: data.status,
      client: data.client ? ClientsMapper.toResDto(data.client) : null,
      created: data.created,
      updated: data.updated,
    };
  }
}
