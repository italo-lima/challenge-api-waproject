import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from 'modules/database/interfaces/product';
import { Product } from 'modules/database/models/product';

import { ProductRepository } from '../repositories/product';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  private async create(data: IProduct): Promise<Product> {
    const product = await this.productRepository.insert(data);
    return product;
  }

  public async save(data: IProduct): Promise<Product> {
    return this.create(data);
  }

  public async totalProducts(): Promise<Number> {
    return await this.productRepository.count();
  }

  public async remove(productId: number): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('not-found');
    }

    return this.productRepository.remove(productId);
  }
}