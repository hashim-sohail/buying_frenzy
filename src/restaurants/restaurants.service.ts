import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewRestaurantInput } from './dto/new-restaurant.input';
import { RestaurantsArgs } from './dto/restaurants.args';
import { Restaurant } from './models/restaurant.model';

@Injectable()
export class RestaurantsService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(data: NewRestaurantInput): Promise<Restaurant> {
    console.log('data is', data);
    this.restaurantRepository.create(data);
    return this.restaurantRepository.save(data);
  }

  async findOneById(id: string): Promise<Restaurant> {
    return {} as any;
  }

  async findAll(restaurantsArgs: RestaurantsArgs): Promise<Restaurant[]> {
    return this.restaurantRepository.find({
      relations: {
        products: true,
      },
    });
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
