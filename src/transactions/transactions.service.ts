import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewTransactionInput } from './dto/new-transaction.input';
import { TransactionsArgs } from './dto/transactions.args';
import { Transaction } from './models/transaction.model';
import { UsersService } from '../users/users.service';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class TransactionsService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly userService: UsersService,
    private readonly restaurantService: RestaurantsService,
  ) {}

  async create(data: NewTransactionInput): Promise<Transaction> {
    this.transactionRepository.create(data);
    const result = this.transactionRepository.save(data);

    await this.userService.updateBalance(data.userId, data.amount);
    await this.restaurantService.updateBalance(data.userId, data.amount);
    return result;
  }

  async findOneById(id: string): Promise<Transaction> {
    return {} as any;
  }

  async findAll(transactionsArgs: TransactionsArgs): Promise<Transaction[]> {
    return [] as Transaction[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
