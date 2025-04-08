import { Injectable } from '@nestjs/common';
import { ManufacturerID } from '../../../common/types/entity-ids.type';
import { ManufacturerRepository } from '../../repository/services/manufacturer.repository';
import { CreateUpdateManufacturerDto } from '../models/dto/req/create-update-manufacturer-dto';
import { ManufacturerEntity } from '../../../database/entities/manufacturer.entity';
import { ManufacturerListQueryDto } from '../models/dto/req/manufacturer-list-query.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    private readonly manufacturerRepository: ManufacturerRepository,
  ) {}
  public async create(
    dto: CreateUpdateManufacturerDto,
  ): Promise<ManufacturerEntity> {
    return await this.manufacturerRepository.save(
      this.manufacturerRepository.create(dto),
    );
  }

  public async findAll(
    query: ManufacturerListQueryDto,
  ): Promise<[ManufacturerEntity[], number]> {
    return await this.manufacturerRepository.findAll(query);
  }

  public async findOne(
    manufacturerId: ManufacturerID,
  ): Promise<ManufacturerEntity> {
    return await this.manufacturerRepository.findOneBy({ id: manufacturerId });
  }

  public async update(
    manufacturerId: ManufacturerID,
    dto: CreateUpdateManufacturerDto,
  ): Promise<ManufacturerEntity> {
    const manufacturer = await this.manufacturerRepository.findOneBy({
      id: manufacturerId,
    });
    this.manufacturerRepository.merge(manufacturer, dto);
    return await this.manufacturerRepository.save(manufacturer);
  }

  public async remove(
    manufacturerId: ManufacturerID,
  ): Promise<ManufacturerEntity> {
    const manufacturer = await this.manufacturerRepository.findOneBy({
      id: manufacturerId,
    });
    return this.manufacturerRepository.remove(manufacturer);
  }
}
