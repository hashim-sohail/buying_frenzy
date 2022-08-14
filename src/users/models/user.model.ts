import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Transaction } from 'src/transactions/models/transaction.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @Column()
  @Directive('@upper')
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true, default: 0, type: 'float' })
  @Field({ nullable: true })
  balance?: number;

  @OneToMany((type) => Transaction, (transaction) => transaction.user)
  @JoinColumn({ name: 'userId' })
  @Field((type) => [Transaction], { nullable: true })
  transactions?: Transaction[];

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  createdAt?: Date;

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  updatedAt?: Date;
}
