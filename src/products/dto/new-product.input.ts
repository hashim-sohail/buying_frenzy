import { Field, InputType, ID } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewProductInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field((type) => ID)
  restaurantId: string;

  @Field((type) => Number)
  price: number;
}
