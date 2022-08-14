import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '../common/scalars/date.scalar';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { Transaction } from './models/transaction.model';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionsResolver, TransactionsService, DateScalar],
  exports: [TransactionsService],
})
export class TransactionsModule {}
