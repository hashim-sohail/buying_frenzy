import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual, Like } from 'typeorm';
import { NewRestaurantInput } from './dto/new-restaurant.input';
import { RestaurantTimingsArgs } from './dto/restaurant-timing.args';
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
    this.restaurantRepository.create(data);
    return this.restaurantRepository.save(data);
  }

  async findOneById(id: string): Promise<Restaurant> {
    return {} as any;
  }

  async findAllByTiming(
    restaurantsArgs: RestaurantTimingsArgs,
  ): Promise<Restaurant[]> {
    return this.restaurantRepository.find({
      where: {
        timings: {
          day: restaurantsArgs.day,
          startTime: LessThanOrEqual(restaurantsArgs.time),
          endTime: MoreThanOrEqual(restaurantsArgs.time),
        },
      },
      relations: {
        timings: true,
      },
    });
  }

  async findAll(restaurantsArgs: RestaurantsArgs): Promise<Restaurant[]> {
    const whereClause = {};
    if (restaurantsArgs.search) {
      whereClause['products'] = {
        name: Like(`%${restaurantsArgs.search}%`),
      };
    }

    return this.restaurantRepository.find({
      skip: restaurantsArgs.skip,
      take: restaurantsArgs.take,
      where: whereClause,
    });
  }

  async findAllByDishPrice(
    restaurantsArgs: RestaurantsArgs,
  ): Promise<Restaurant[]> {
    console.log('RestaurantsArgs', restaurantsArgs);
    const havingClause =
      restaurantsArgs.operation === 0
        ? `COUNT(1) > ${restaurantsArgs.dishCount}`
        : `COUNT(1) < ${restaurantsArgs.dishCount}`;
    return await this.restaurantRepository.query(`
      SELECT
        *
      FROM
        restaurant
      WHERE
        id IN(
          SELECT
            r.id FROM restaurant r
          LEFT JOIN product p ON p. "restaurantId" = r.id
        WHERE
          p.price BETWEEN ${restaurantsArgs.minPrice} AND ${restaurantsArgs.maxPrice}
        GROUP BY
          r.id
        HAVING
          ${havingClause})
        LIMIT
          ${restaurantsArgs.take}
    `);
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }

  async updateBalance(id: string, balance: number) {
    return this.restaurantRepository.query(
      `UPDATE restaurant SET balance = (balance + ${balance}) WHERE id = '${id}'`,
    );
  }
}
