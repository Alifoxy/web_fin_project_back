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
    const status = await this.statusRepository.findById(statusId);
    return this.statusRepository.remove(status);
  }

  public async IsStatusExists(status: string): Promise<StatusEntity> {
    return await this.statusRepository.findOneBy({ status: status });
  }

  public async IsStatusDefault(statusId: StatusID): Promise<boolean> {
    const status = await this.statusRepository.findOneBy({ id: statusId });
    return status.is_default === true;
  }

  public async IsStatusReturnReady(statusId: StatusID): Promise<boolean> {
    const status = await this.statusRepository.findOneBy({ id: statusId });
    return status.is_return_ready === true;
  }

  public async IsStatusFinal(statusId: StatusID): Promise<boolean> {
    const status = await this.statusRepository.findOneBy({ id: statusId });
    return status.is_final === true;
  }

  public async IsStatusWParamExists(
    param: CreateUpdateStatusDto,
  ): Promise<StatusEntity> {
    if (param.is_default) {
      return await this.IsBaseExists();
    } else if (param.is_final) {
      return await this.IsFinalExists();
    } else if (param.is_return_ready) {
      return await this.IsReturnReadyExists();
    }
  }

  public async IsBaseExists(): Promise<StatusEntity> {
    return await this.statusRepository.findOneBy({ is_default: true });
  }

  public async IsReturnReadyExists(): Promise<StatusEntity> {
    return await this.statusRepository.findOneBy({ is_return_ready: true });
  }

  public async IsFinalExists(): Promise<StatusEntity> {
    return await this.statusRepository.findOneBy({ is_final: true });
  }

  public async SetManufacturerRequired(
    statusId: StatusID,
    manufacturer_required: boolean,
  ): Promise<StatusEntity> {
    const st = await this.statusRepository.findById(statusId);
    await this.statusRepository.merge(st, {
      manufacturer_required: manufacturer_required,
    });
    return await this.statusRepository.save(st);
  }

  public async SetIsDefault(
    statusId: StatusID,
    is_default: boolean,
  ): Promise<StatusEntity> {
    const st = await this.statusRepository.findById(statusId);
    await this.statusRepository.merge(st, {
      is_default: is_default,
    });
    return await this.statusRepository.save(st);
  }

  public async SetIsReturnReady(
    statusId: StatusID,
    is_return_ready: boolean,
  ): Promise<StatusEntity> {
    const st = await this.statusRepository.findById(statusId);
    await this.statusRepository.merge(st, {
      is_return_ready: is_return_ready,
    });
    return await this.statusRepository.save(st);
  }

  public async SetIsFinal(
    statusId: StatusID,
    is_final: boolean,
  ): Promise<StatusEntity> {
    const st = await this.statusRepository.findById(statusId);
    await this.statusRepository.merge(st, {
      is_final: is_final,
    });
    return await this.statusRepository.save(st);
  }

  public async CheckManufacturerRequired(status: string): Promise<boolean> {
    const stat = await this.statusRepository.findOneBy({
      status: status,
    });
    return stat.manufacturer_required;
  }
}
