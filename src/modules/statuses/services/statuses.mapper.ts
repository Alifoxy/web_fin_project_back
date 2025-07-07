import { Injectable } from '@nestjs/common';
import { StatusEntity } from '../../../database/entities/status.entity';
import { StatusResDto } from '../models/dto/res/status.res.dto';
import { StatusListQueryDto } from '../models/dto/req/status-list-query.dto';
import { StatusListResDto } from '../models/dto/res/status-list.res.dto';
import { StatusParamListResDto } from '../models/dto/res/status-param-list.res.dto';

@Injectable()
export class StatusesMapper {
  public static toResDtoList(
    data: StatusEntity[],
    page: string,
    total: number,
    query: StatusListQueryDto,
  ): StatusListResDto {
    return { data: data.map(this.toResDto), page, total, ...query };
  }

  public static toParamResDtoList(
    data: StatusEntity[],
    total: number,
    query: StatusListQueryDto,
  ): StatusParamListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: StatusEntity): StatusResDto {
    return {
      id: data.id,
      status: data.status,
      manufacturer_required: data.manufacturer_required,
      is_default: data.is_default,
      is_return_ready: data.is_return_ready,
      is_final: data.is_final,
      created: data.created.toLocaleString(),
    };
  }
}
