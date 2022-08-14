import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/models/product.model';
import { Restaurant } from 'src/restaurants/models/restaurant.model';
import { User } from 'src/users/models/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'Transaction' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @Column({ type: 'float' })
  @Field()
  amount: number;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.transactions, {
    eager: true,
  })
  @Field((type) => Restaurant, { nullable: true })
  restaurant: Restaurant;

  @ManyToOne((type) => Product, (product) => product.transactions, {
    eager: true,
  })
  @Field((type) => Product, { nullable: true })
  product: Product;

  @ManyToOne((type) => User, (user) => user.transactions, {
    eager: true,
  })
  @Field((type) => User, { nullable: true })
  user: User;

  @Column()
  restaurantId: string;

  @Column()
  productId: string;

  @Column()
  userId: string;

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  createdAt?: Date;

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  updatedAt?: Date;
}
