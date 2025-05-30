import { ManufacturerResDto } from './manufacturer.res.dto';
import { ManufacturerListQueryDto } from '../req/manufacturer-list-query.dto';

export class ManufacturerParamListResDto extends ManufacturerListQueryDto {
  data: ManufacturerResDto[];
  total: number;
}
