import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurants/models/restaurant.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Timing' })
export class Timing {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @Column()
  @Directive('@upper')
  @Field()
  day: string;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.products, {
    eager: true,
  })
  @Field((type) => Restaurant, { nullable: true })
  restaurant: Restaurant;

  @Column()
  @Field()
  restaurantId: string;

  @Column({ type: 'time' })
  @Field()
  startTime?: string;

  @Column({ type: 'time' })
  @Field()
  endTime?: string;

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  createdAt?: Date;

  @Column({ nullable: true, default: new Date() })
  @Field({ defaultValue: Date.now(), nullable: true })
  updatedAt?: Date;
}
