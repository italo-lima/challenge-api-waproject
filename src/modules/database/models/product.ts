import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IProduct } from '../interfaces/product';

export class Product extends Model implements IProduct {
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
    return 'products';
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    return json;
  }

  public $formatJson(data: IProduct): IProduct {
    return data
  }
}
