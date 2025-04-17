import { Injectable } from '@nestjs/common';
import { ClientEntity } from '../../../database/entities/client.entity';
import { ClientListQueryDto } from '../models/dto/req/client-list-query.dto';
import { ClientListResDto } from '../models/dto/res/client-list.res.dto';
import { ClientResDto } from '../models/dto/res/client.res.dto';
import { RecordsMapper } from '../../records/services/records.mapper';

@Injectable()
export class ClientsMapper {
  public static toResDtoList(
    data: ClientEntity[],
    total: number,
    query: ClientListQueryDto,
  ): ClientListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: ClientEntity): ClientResDto {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      records: data.records,
      created: data.created,
      updated: data.updated,
    };
  }

  // public static toClientResDto(client: ClientEntity): ClientResDto {
  //   return {
  //     id: client.id,
  //     name: client.name,
  //     surname: client.surname,
  //     email: client.email,
  //     phone: client.phone,
  //     created: client.created,
  //     updated: client.updated,
  //   };
  // }
}
