import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../../restaurants/models/restaurant.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/models/transaction.model';

@Entity()
@ObjectType({ description: 'Product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID, { nullable: true })
  id: string;

  @Column()
  @Directive('@upper')
  @Field({ nullable: true })
  name: string;

  @Column({ default: 0, type: 'float' })
  @Field({ nullable: true })
  price: number;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.products, {
    eager: true,
  })
  @Field((type) => Restaurant, { nullable: true })
  restaurant: Restaurant;

  @OneToMany((type) => Transaction, (transaction) => transaction.restaurant)
  @JoinColumn({ name: 'restrauntId' })
  @Field((type) => [Product], { nullable: true })
  transactions?: Transaction[];

  @Column()
  restaurantId: string;

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  createdAt?: Date;

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  updatedAt?: Date;
}
