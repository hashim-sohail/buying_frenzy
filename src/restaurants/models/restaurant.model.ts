import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Timing } from '../../timings/models/timing.model';
import { Transaction } from '../../transactions/models/transaction.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/models/product.model';

@Entity()
@ObjectType({ description: 'Restaurant' })
export class Restaurant {
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

  @OneToMany((type) => Product, (product) => product.restaurant)
  @JoinColumn({ name: 'restrauntId' })
  @Field((type) => [Product], { nullable: true })
  products?: Product[];

  @OneToMany((type) => Transaction, (transaction) => transaction.restaurant)
  @JoinColumn({ name: 'restrauntId' })
  @Field((type) => [Transaction], { nullable: true })
  transactions?: Transaction[];

  @OneToMany((type) => Timing, (timing) => timing.restaurant)
  @JoinColumn({ name: 'restrauntId' })
  @Field((type) => [Timing], { nullable: true })
  timings?: Timing[];

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  createdAt?: Date;

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  updatedAt?: Date;
}
