import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: NewUserInput): Promise<User> {
    this.userRepository.create(data);
    return this.userRepository.save(data);
  }

  async findOneById(id: string): Promise<User> {
    return {} as any;
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    return [] as User[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }

  async updateBalance(id: string, balance: number) {
    return this.userRepository.query(
      `UPDATE "user" SET balance = (balance - ${balance}) WHERE id = '${id}'`,
    );
  }
}
