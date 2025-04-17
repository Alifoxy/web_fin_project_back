import { Injectable } from '@nestjs/common';
import { RecordListQueryDto } from '../models/dto/req/record-list-query.dto';
import { ClientsMapper } from '../../clients/services/clients.mapper';
import { RecordListResDto } from '../models/dto/res/record-list.res.dto';
import { RecordEntity } from '../../../database/entities/record.entity';
import { RecordResDto } from '../models/dto/res/record.res.dto';
import { DevicesMapper } from '../../devices/services/devices.mapper';
import { RecordListSimpleResDto } from '../models/dto/res/record-list-simple.res.dto';
// import { DeviceEntity } from "../../../database/entities/device.entity";
// import { DeviceListSimpleResDto } from "../../devices/models/dto/res/device-list-simple.res.dto";
// import { RecordListSimpleResDto } from "../models/dto/res/record-list-simple.res.dto";

@Injectable()
export class RecordsMapper {
  public static toResDtoList(
    data: RecordEntity[],
    total: number,
    query: RecordListQueryDto,
  ): RecordListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toSimpleResDtoList(
    data: RecordEntity[],
  ): RecordListSimpleResDto {
    return { data: data.map(this.toResDto) };
  }

  public static toResDto(data: RecordEntity): RecordResDto {
    return {
      id: data.id,
      client_id: data.client_id,
      client: data.client ? ClientsMapper.toResDto(data.client) : null,
      record_num: data.record_num,
      devices: data.devices
        ? DevicesMapper.toSimpleResDtoList(data.devices)
        : null,
      created: data.created,
      updated: data.updated,
    };
  }
}
