import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { StatusID } from "../../common/types/entity-ids.type";
import { StatusesService } from "./services/statuses.service";
import { CreateUpdateStatusDto } from "./models/dto/req/create-update-status-dto";
import { StatusesMapper } from "./services/statuses.mapper";
import { StatusListQueryDto } from "./models/dto/req/status-list-query.dto";
import { StatusListResDto } from "./models/dto/res/status-list.res.dto";
import { StatusParamListResDto } from "./models/dto/res/status-param-list.res.dto";
import { StatusResDto } from "./models/dto/res/status.res.dto";
import { ChangeStatusPropsReqDto } from "./models/dto/req/change_status_props_req.dto";
import { DevicesService } from "../devices/services/devices.service";

@Controller('statuses')
export class StatusesController {
  constructor(
    private statusService: StatusesService,
    private deviceService: DevicesService,
  ) {}

  @Post()
  public async create(@Body() dto: CreateUpdateStatusDto) {
    const ex_status = await this.statusService.IsStatusExists(dto.status);
    const stat_w_params_exist =
      await this.statusService.IsStatusWParamExists(dto);

    const multiple_params =
      (dto.is_final && dto.is_default) ||
      (dto.is_final && dto.is_return_ready) ||
      (dto.is_return_ready && dto.is_default) ||
      (dto.is_return_ready && dto.is_default && dto.is_final);

    if (multiple_params) {
      throw new ConflictException(`Status cannot have multiple main params`);
    } else if (stat_w_params_exist) {
      throw new ForbiddenException(
        `Status with this property already exists !`,
      );
    } else if (ex_status) {
      throw new BadRequestException(`Status already exists !`);
    } else {
      const result = await this.statusService.create(dto);
      return StatusesMapper.toResDto(result);
    }
  }

  @Get()
  public async findAll(
    @Query() query: StatusListQueryDto,
  ): Promise<StatusParamListResDto> {
    const [entities, total] = await this.statusService.findByName(query);
    return StatusesMapper.toParamResDtoList(entities, total, query);
  }

  @Get('byPage')
  public async findAllByPage(
    @Query() query: StatusListQueryDto,
  ): Promise<StatusListResDto> {
    const [entities, total] = await this.statusService.findAll(query);
    return StatusesMapper.toResDtoList(entities, query.page, total, query);
  }

  @Get('byName')
  public async findByName(
    @Query() query: StatusListQueryDto,
  ): Promise<StatusParamListResDto> {
    const [entities, total] = await this.statusService.findByName(query);
    return StatusesMapper.toParamResDtoList(entities, total, query);
  }

  @Patch(':statusId/setManufacturerRequired')
  public async setManufacturerRequired(
    @Body() dto: ChangeStatusPropsReqDto,
    @Param('statusId', ParseUUIDPipe) statusId: StatusID,
  ): Promise<StatusResDto> {
    const set = await this.statusService.SetManufacturerRequired(
      statusId,
      dto.manufacturer_required,
    );
    return StatusesMapper.toResDto(set);
  }

  @Patch(':statusId/setDefaultStatus')
  public async setDefaultStatus(
    @Body() dto: ChangeStatusPropsReqDto,
    @Param('statusId', ParseUUIDPipe) statusId: StatusID,
  ): Promise<StatusResDto> {
    const ex_default = await this.statusService.IsBaseExists();
    const is_final = await this.statusService.IsStatusFinal(statusId);
    const is_return_ready =
      await this.statusService.IsStatusReturnReady(statusId);
    if (ex_default && dto.is_default === true) {
      throw new BadRequestException(`Default status is already set!`);
    } else if (is_final && dto.is_default === true) {
      throw new ConflictException(
        `This status is set as final, it cannot be default!`,
      );
    } else if (is_return_ready && dto.is_default === true) {
      throw new ConflictException(
        `This status is set as return_ready, it cannot be default!`,
      );
    } else {
      const result = await this.statusService.SetIsDefault(
        statusId,
        dto.is_default,
      );
      return StatusesMapper.toResDto(result);
    }
  }

  @Patch(':statusId/setReturnReadyStatus')
  public async setReturnReadyStatus(
    @Body() dto: ChangeStatusPropsReqDto,
    @Param('statusId', ParseUUIDPipe) statusId: StatusID,
  ): Promise<StatusResDto> {
    const ex_return_ready = await this.statusService.IsReturnReadyExists();
    const is_default = await this.statusService.IsStatusDefault(statusId);
    const is_final = await this.statusService.IsStatusFinal(statusId);
    if (ex_return_ready && dto.is_return_ready === true) {
      throw new BadRequestException(`Return ready status is already set!`);
    } else if (is_final && dto.is_return_ready === true) {
      throw new ConflictException(
        `This status is set as final, it cannot be return ready!`,
      );
    } else if (is_default && dto.is_return_ready === true) {
      throw new ConflictException(
        `This status is set as default, it cannot be return ready!`,
      );
    } else {
      const result = await this.statusService.SetIsReturnReady(
        statusId,
        dto.is_return_ready,
      );
      return StatusesMapper.toResDto(result);
    }
  }

  @Patch(':statusId/setFinalStatus')
  public async setFinalStatus(
    @Body() dto: ChangeStatusPropsReqDto,
    @Param('statusId', ParseUUIDPipe) statusId: StatusID,
  ): Promise<StatusResDto> {
    const ex_final = await this.statusService.IsFinalExists();
    const is_default = await this.statusService.IsStatusDefault(statusId);
    const is_return_ready =
      await this.statusService.IsStatusReturnReady(statusId);
    if (ex_final && dto.is_final === true) {
      throw new BadRequestException(`Final status is already set!`);
    } else if (is_default && dto.is_final === true) {
      throw new ConflictException(
        `This status is set as default, it cannot be final!`,
      );
    } else if (is_return_ready && dto.is_final === true) {
      throw new ConflictException(
        `This status is set as return_ready, it cannot be final!`,
      );
    } else {
      const result = await this.statusService.SetIsFinal(
        statusId,
        dto.is_final,
      );
      return StatusesMapper.toResDto(result);
    }
  }

  @Delete(':statusId')
  public async remove(@Param('statusId', ParseUUIDPipe) statusId: StatusID) {
    const stat_devices = await this.deviceService.findByStatus(statusId);
    if (stat_devices.length > 0) {
      throw new ConflictException(
        `This status is in use, it cannot be deleted!`,
      );
    } else {
      return this.statusService.remove(statusId);
    }
  }
}
