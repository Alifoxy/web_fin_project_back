import { Injectable } from '@nestjs/common';
import { ManufacturerEntity } from '../../../database/entities/manufacturer.entity';
import { ManufacturerListQueryDto } from '../models/dto/req/manufacturer-list-query.dto';
import { ManufacturerListResDto } from '../models/dto/res/manufacturer-list.res.dto';
import { ManufacturerResDto } from '../models/dto/res/manufacturer.res.dto';
import { ManufacturerParamListResDto } from '../models/dto/res/manufacturer-param-list.res.dto';

@Injectable()
export class ManufacturersMapper {
  public static toResDtoList(
    data: ManufacturerEntity[],
    page: string,
    total: number,
    query: ManufacturerListQueryDto,
  ): ManufacturerListResDto {
    return { data: data.map(this.toResDto), page, total, ...query };
  }

  public static toParamResDtoList(
    data: ManufacturerEntity[],
    total: number,
    query: ManufacturerListQueryDto,
  ): ManufacturerParamListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: ManufacturerEntity): ManufacturerResDto {
    return {
      id: data.id,
      manufacturer: data.manufacturer,
      created: data.created.toLocaleString(),
    };
  }
}
