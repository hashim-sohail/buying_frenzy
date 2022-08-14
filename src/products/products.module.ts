import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '../common/scalars/date.scalar';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsResolver, ProductsService, DateScalar],
  exports: [ProductsService],
})
export class ProductsModule {}
