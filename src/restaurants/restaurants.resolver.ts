import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewRestaurantInput } from './dto/new-restaurant.input';
import { RestaurantTimingsArgs } from './dto/restaurant-timing.args';
import { RestaurantsArgs } from './dto/restaurants.args';
import { Restaurant } from './models/restaurant.model';
import { RestaurantsService } from './restaurants.service';

const pubSub = new PubSub();

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Query((returns) => Restaurant)
  async restaurant(@Args('id') id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantsService.findOneById(id);
    if (!restaurant) {
      throw new NotFoundException(id);
    }
    return restaurant;
  }

  @Query((returns) => [Restaurant])
  restaurants(@Args() restaurantsArgs: RestaurantsArgs): Promise<Restaurant[]> {
    return this.restaurantsService.findAll(restaurantsArgs);
  }

  @Query((returns) => [Restaurant])
  restaurantsByTime(
    @Args() restaurantsArgs: RestaurantTimingsArgs,
  ): Promise<Restaurant[]> {
    return this.restaurantsService.findAllByTiming(restaurantsArgs);
  }

  @Query((returns) => [Restaurant])
  findAllByDishPrice(
    @Args() restaurantsArgs: RestaurantsArgs,
  ): Promise<Restaurant[]> {
    return this.restaurantsService.findAllByDishPrice(restaurantsArgs);
  }

  @Mutation((returns) => Restaurant)
  async addRestaurant(
    @Args('newRestaurantData') newRestaurantData: NewRestaurantInput,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantsService.create(newRestaurantData);
    pubSub.publish('restaurantAdded', { restaurantAdded: restaurant });
    return restaurant;
  }

  @Mutation((returns) => Boolean)
  async removeRestaurant(@Args('id') id: string) {
    return this.restaurantsService.remove(id);
  }

  @Subscription((returns) => Restaurant)
  restaurantAdded() {
    return pubSub.asyncIterator('restaurantAdded');
  }
}
