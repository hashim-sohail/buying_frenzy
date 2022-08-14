import { seeder } from 'nestjs-seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/models/restaurant.model';
import { ProductsModule } from './products/products.module';
import { Product } from './products/models/product.model';
import { TimingsModule } from './timings/timings.module';
import { Timing } from './timings/models/timing.model';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/models/transaction.model';
import { Seeders } from './seeders/seeders';

seeder({
  imports: [
    UsersModule,
    RestaurantsModule,
    ProductsModule,
    TimingsModule,
    TransactionsModule,
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'SuperSecret!23',
        database: 'buying_frenzy',
        entities: [User, Restaurant, Product, Timing, Transaction],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
}).run([Seeders]);
