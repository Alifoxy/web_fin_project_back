import { Injectable } from '@nestjs/common';
import { ManufacturerEntity } from '../../../database/entities/manufacturer.entity';
import { ManufacturerListQueryDto } from '../models/dto/req/manufacturer-list-query.dto';
import { ManufacturerListResDto } from '../models/dto/res/manufacturer-list.res.dto';
import { ManufacturerResDto } from '../models/dto/res/manufacturer.res.dto';

@Injectable()
export class ManufacturersMapper {
  public static toResDtoList(
    data: ManufacturerEntity[],
    total: number,
    query: ManufacturerListQueryDto,
  ): ManufacturerListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: ManufacturerEntity): ManufacturerResDto {
    return {
      id: data.id,
      manufacturer: data.manufacturer,
      created: data.created,
    };
  }
}
