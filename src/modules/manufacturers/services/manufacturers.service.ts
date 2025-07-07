import { Injectable } from '@nestjs/common';
import { ManufacturerID } from '../../../common/types/entity-ids.type';
import { ManufacturerRepository } from '../../repository/services/manufacturer.repository';
import { CreateUpdateManDto } from '../models/dto/req/create-update-manufacturer-dto';
import { ManufacturerEntity } from '../../../database/entities/manufacturer.entity';
import { ManufacturerListQueryDto } from '../models/dto/req/manufacturer-list-query.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    private readonly manufacturerRepository: ManufacturerRepository,
  ) {}
  public async create(dto: CreateUpdateManDto): Promise<ManufacturerEntity> {
    return await this.manufacturerRepository.save(
      this.manufacturerRepository.create(dto),
    );
  }

  public async findAll(
    query: ManufacturerListQueryDto,
  ): Promise<[ManufacturerEntity[], number]> {
    return await this.manufacturerRepository.findAll(query);
  }

  public async findByName(
    query: ManufacturerListQueryDto,
  ): Promise<[ManufacturerEntity[], number]> {
    return await this.manufacturerRepository.findByName(query);
  }

  public async remove(
    manufacturerId: ManufacturerID,
  ): Promise<ManufacturerEntity> {
    const manufacturer = await this.manufacturerRepository.findOneBy({
      id: manufacturerId,
    });
    return this.manufacturerRepository.remove(manufacturer);
  }

  public async IsManufacturerExists(manufacturer: string): Promise<boolean> {
    const m = await this.manufacturerRepository.findOneBy({
      manufacturer: manufacturer,
    });
    return !!m;
  }
}