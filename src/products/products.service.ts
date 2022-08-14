import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewProductInput } from './dto/new-product.input';
import { ProductsArgs } from './dto/products.args';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: NewProductInput): Promise<Product> {
    this.productRepository.create(data);
    return this.productRepository.save(data);
  }

  async findOneById(id: string): Promise<Product> {
    return {} as any;
  }

  async findAll(productsArgs: ProductsArgs): Promise<Product[]> {
    return [] as Product[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
