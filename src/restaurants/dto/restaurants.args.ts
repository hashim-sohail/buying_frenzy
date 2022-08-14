import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

export enum AllowedColor {
  MORE,
  LESS,
}

registerEnumType(AllowedColor, {
  name: 'AllowedColor',
});

@ArgsType()
export class RestaurantsArgs {
  @Field((type) => Int)
  @Min(0)
  skip = 0;

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field((type) => Int)
  maxPrice? = 99999;

  @Field((type) => Int)
  minPrice? = 0;

  @Field((type) => Int)
  dishCount? = 9999;

  @Field((type) => AllowedColor, { nullable: true })
  operation?: AllowedColor;

  @Field({ nullable: true })
  search?: string;
}
