import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewTransactionInput {
  @Field()
  userId: string;

  @Field()
  productId: string;

  @Field()
  restaurantId: string;

  @Field()
  amount: number;
}
