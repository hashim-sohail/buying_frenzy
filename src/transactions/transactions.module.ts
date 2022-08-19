import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '../common/scalars/date.scalar';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { Transaction } from './models/transaction.model';
import { UsersModule } from '../users/users.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    UsersModule,
    RestaurantsModule,
  ],
  providers: [TransactionsResolver, TransactionsService, DateScalar],
  exports: [TransactionsService],
})
export class TransactionsModule {}
