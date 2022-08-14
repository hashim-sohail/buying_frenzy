import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { HttpService } from '@nestjs/axios';
import { UsersService } from '../users/users.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { ProductsService } from '../products/products.service';
import { TransactionsService } from '../transactions/transactions.service';
import { TimingsService } from '../timings/timings.service';

@Injectable()
export class Seeders implements Seeder {
  constructor(
    private readonly userService: UsersService,
    private readonly restaurantService: RestaurantsService,
    private readonly productService: ProductsService,
    private readonly timingService: TimingsService,
    private readonly transactionService: TransactionsService,
    private readonly httpService: HttpService,
  ) {}

  async seed(): Promise<any> {
    const userRawData = await this.httpService.axiosRef.get(
      'https://gist.githubusercontent.com/seahyc/de33162db680c3d595e955752178d57d/raw/785007bc91c543f847b87d705499e86e16961379/users_with_purchase_history.json',
    );

    const restaurantsRawData = await this.httpService.axiosRef.get(
      'https://gist.githubusercontent.com/seahyc/b9ebbe264f8633a1bf167cc6a90d4b57/raw/021d2e0d2c56217bad524119d1c31419b2938505/restaurant_with_menu.json',
    );

    const restaurantsMap = {};

    for (const data of restaurantsRawData.data) {
      const params = {
        name: data.restaurantName,
        balance: data.cashBalance,
      };

      const resp = await this.restaurantService.create(params);
      resp['items'] = {};
      restaurantsMap[resp.name] = resp;

      for (const item of data.menu) {
        const params = {
          name: item.dishName,
          price: item.price,
          restaurantId: resp.id,
        };

        const itemResp = await this.productService.create(params);

        restaurantsMap[resp.name].items[item.dishName] = itemResp;
      }
    }

    const usersMap = {};

    for (const data of userRawData.data) {
      console.log('data', data);
      const params = {
        name: data.name,
        balance: data.cashBalance,
      };

      const resp = await this.userService.create(params);
      resp['items'] = {};
      usersMap[resp.name] = resp;

      for (const item of data.purchaseHistory) {
        const params = {
          userId: resp.id,
          amount: item.transactionAmount,
          restaurantId: restaurantsMap[item.restaurantName].id,
          productId:
            restaurantsMap[item.restaurantName]['items'][item.dishName].id,
        };

        const itemResp = await this.transactionService.create(params);
      }
    }
  }

  async drop(): Promise<any> {
    let x;
  }
}
