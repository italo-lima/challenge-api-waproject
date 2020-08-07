import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, IsNumber, MinLength, IsOptional } from 'class-validator';
import { IProduct } from 'modules/database/interfaces/product';

export class SaveValidator implements IProduct {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @ApiProperty({ required: true, type: 'string', minLength: 4})
  public name: string;

  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public description: string;

  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  public amount: number;

  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  public value: number;
}