import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewTransactionInput } from './dto/new-transaction.input';
import { TransactionsArgs } from './dto/transactions.args';
import { Transaction } from './models/transaction.model';
import { TransactionsService } from './transactions.service';

const pubSub = new PubSub();

@Resolver((of) => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query((returns) => Transaction)
  async transaction(@Args('id') id: string): Promise<Transaction> {
    const transaction = await this.transactionsService.findOneById(id);
    if (!transaction) {
      throw new NotFoundException(id);
    }
    return transaction;
  }

  @Query((returns) => [Transaction])
  transactions(
    @Args() transactionsArgs: TransactionsArgs,
  ): Promise<Transaction[]> {
    return this.transactionsService.findAll(transactionsArgs);
  }

  @Mutation((returns) => Transaction)
  async addTransaction(
    @Args('newTransactionData') newTransactionData: NewTransactionInput,
  ): Promise<Transaction> {
    const transaction = await this.transactionsService.create(
      newTransactionData,
    );

    return transaction;
  }

  @Mutation((returns) => Boolean)
  async removeTransaction(@Args('id') id: string) {
    return this.transactionsService.remove(id);
  }

  @Subscription((returns) => Transaction)
  transactionAdded() {
    return pubSub.asyncIterator('transactionAdded');
  }
}
