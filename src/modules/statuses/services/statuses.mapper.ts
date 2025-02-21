import { Injectable } from '@nestjs/common';
import { StatusEntity } from '../../../database/entities/status.entity';
import { StatusResDto } from '../models/dto/res/status.res.dto';
import { StatusListQueryDto } from '../models/dto/req/status-list-query.dto';
import { StatusListResDto } from '../models/dto/res/status-list.res.dto';

@Injectable()
export class StatusesMapper {
  public static toResDtoList(
    data: StatusEntity[],
    total: number,
    query: StatusListQueryDto,
  ): StatusListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: StatusEntity): StatusResDto {
    return {
      id: data.id,
      status: data.status,
      created: data.created,
    };
  }
}
