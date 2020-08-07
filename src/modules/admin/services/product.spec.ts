import { NotFoundException } from '@nestjs/common';

import { ProductRepository } from '../repositories/product';
import { ProductService } from './product';

/* eslint-disable max-len */
describe('DemandService', () => {
  let productRepository: ProductRepository;
  let productService: ProductService;

  beforeEach(async () => {
    productRepository = new ProductRepository();

    productService = new ProductService(productRepository);
  });

  it('should be able create a new product', async () => {
    jest.spyOn(productRepository, 'insert').mockImplementationOnce(product => Promise.resolve({ ...product } as any));
 
    const product = await productService.save({
      name: "Feijão",
      value: 10,
      description: "Teste",
      amount: 1
    })

    expect(product.value).toBe(10)
  });

  it('should be able return total of products', async () => {
    jest.spyOn(productRepository, 'insert').mockImplementationOnce(product => Promise.resolve({ ...product } as any));
    jest.spyOn(productRepository, 'insert').mockImplementationOnce(product => Promise.resolve({ ...product } as any));
    jest.spyOn(productRepository, 'count').mockResolvedValueOnce(2);

    await productService.save({
      name: "Feijão",
      value: 10,
      description: "Teste 1",
      amount: 1
    })

    await productService.save({
      name: "Arroz",
      value: 2,
      description: "Teste 2",
      amount: 10
    })

    const result = await productService.totalProducts()

    expect(result).toBe(2)
  });

  it('should be able deleting existing product', async () => {
    jest.spyOn(productRepository, 'insert').mockImplementationOnce(product => Promise.resolve({ ...product } as any));
    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce({id: 1} as any);
    jest.spyOn(productRepository, 'remove').mockResolvedValueOnce({id: 1 } as any);

    await productService.save({
      name: "Arroz",
      value: 2,
      description: "Teste",
      amount: 10
    })

    const response = await productService.remove(1)
    
    expect(response).not.toBeInstanceOf(NotFoundException)
  });

  it('should not be able deleting non-existing product', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce(null);

    await expect(productService.remove(1)).rejects.toBeInstanceOf(NotFoundException)

  });
});