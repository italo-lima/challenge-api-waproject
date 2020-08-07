import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { Product } from 'modules/database/models/product';
import { enRoles } from 'modules/database/interfaces/user';

import { ProductRepository } from '../repositories/product';
import { ProductService } from '../services/product';
import { IndexValidator } from '../validators/product/index';
import { SaveValidator } from '../validators/product/save';

@ApiTags('Admin: Product')
@Controller("product")
@AuthRequired([enRoles.admin])
export class ProductController {
  constructor(private productRepository: ProductRepository, private productService: ProductService) {}

  @Post()
  @ApiResponse({ status: 200, type: Product })
  public async save(@Body() data: SaveValidator) {
    return this.productService.save(data)
  }

  @Get(':productId')
  @ApiResponse({ status: 200, type: Product })
  public async show(@Param('productId', ParseIntPipe) productId: number) {
    return this.productRepository.findById(productId);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async index(@Query() data: IndexValidator) {

    return this.productRepository.index(data)
  }

  @Delete(':productId')
  public async delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.remove(productId)
  }
}