import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class RestaurantTimingsArgs {
  @Field()
  day: string;

  @Field()
  time: string;
}
