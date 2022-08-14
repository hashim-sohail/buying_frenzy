import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
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

@Module({
  imports: [
    UsersModule,
    RestaurantsModule,
    ProductsModule,
    TimingsModule,
    TransactionsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Restaurant, Product, Timing, Transaction],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
