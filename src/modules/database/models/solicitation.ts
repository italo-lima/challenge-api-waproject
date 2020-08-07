import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { ISolicitation } from '../interfaces/solicitation';

export class Solicitation extends Model implements ISolicitation {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public name: string;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'number' })
  public amount: number;
  @ApiProperty({ type: 'number' })
  public value: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public created_at: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updated_at: Date;

  public static get tableName(): string {
    return 'solicitations';
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    return json;
  }

  public $formatJson(data: ISolicitation): ISolicitation {
    return data
  }
}
