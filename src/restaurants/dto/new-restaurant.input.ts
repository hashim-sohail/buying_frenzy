import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewRestaurantInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  balance: number;
}
