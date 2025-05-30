import { Injectable } from '@nestjs/common';
import { StatusID } from '../../../common/types/entity-ids.type';
import { CreateUpdateStatusDto } from '../models/dto/req/create-update-status-dto';
import { StatusRepository } from '../../repository/services/status.repository';
import { StatusEntity } from '../../../database/entities/status.entity';
import { StatusListQueryDto } from '../models/dto/req/status-list-query.dto';

@Injectable()
export class StatusesService {
  constructor(private readonly statusRepository: StatusRepository) {}

  public async create(dto: CreateUpdateStatusDto): Promise<StatusEntity> {
    return await this.statusRepository.save(this.statusRepository.create(dto));
  }

  public async findAll(
    query: StatusListQueryDto,
  ): Promise<[StatusEntity[], number]> {
    return await this.statusRepository.findAll(query);
  }

  public async findByName(
    query: StatusListQueryDto,
  ): Promise<[StatusEntity[], number]> {
    return await this.statusRepository.findByName(query);
  }

  public async remove(statusId: StatusID): Promise<StatusEntity> {
    const status = await this.statusRepository.findOneBy({ id: statusId });
    return this.statusRepository.remove(status);
  }

  public async IsStatusExists(status: string): Promise<boolean> {
    const s = await this.statusRepository.findOneBy({
      status: status,
    });
    return !!s;
  }

  // public async findOne(statusId: StatusID): Promise<StatusEntity> {
  //   return await this.statusRepository.findOneBy({ id: statusId });
  // }
  //
  // public async update(
  //   statusId: StatusID,
  //   dto: CreateUpdateStatusDto,
  // ): Promise<StatusEntity> {
  //   const status = await this.statusRepository.findOneBy({ id: statusId });
  //   this.statusRepository.merge(status, dto);
  //   return await this.statusRepository.save(status);
  // }
}
