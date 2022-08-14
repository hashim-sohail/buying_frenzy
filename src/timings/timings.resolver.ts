import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewTimingInput } from './dto/new-timing.input';
import { TimingsArgs } from './dto/timings.args';
import { Timing } from './models/timing.model';
import { TimingsService } from './timings.service';

const pubSub = new PubSub();

@Resolver((of) => Timing)
export class TimingsResolver {
  constructor(private readonly timingsService: TimingsService) {}

  @Query((returns) => Timing)
  async timing(@Args('id') id: string): Promise<Timing> {
    const timing = await this.timingsService.findOneById(id);
    if (!timing) {
      throw new NotFoundException(id);
    }
    return timing;
  }

  @Query((returns) => [Timing])
  timings(@Args() timingsArgs: TimingsArgs): Promise<Timing[]> {
    return this.timingsService.findAll(timingsArgs);
  }

  @Mutation((returns) => Timing)
  async addTiming(
    @Args('newTimingData') newTimingData: NewTimingInput,
  ): Promise<Timing> {
    const timing = await this.timingsService.create(newTimingData);
    pubSub.publish('timingAdded', { timingAdded: timing });
    return timing;
  }

  @Mutation((returns) => Boolean)
  async removeTiming(@Args('id') id: string) {
    return this.timingsService.remove(id);
  }

  @Subscription((returns) => Timing)
  timingAdded() {
    return pubSub.asyncIterator('timingAdded');
  }
}
