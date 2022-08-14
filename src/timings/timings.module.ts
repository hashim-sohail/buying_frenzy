import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '../common/scalars/date.scalar';
import { TimingsResolver } from './timings.resolver';
import { TimingsService } from './timings.service';
import { Timing } from './models/timing.model';

@Module({
  imports: [TypeOrmModule.forFeature([Timing])],
  providers: [TimingsResolver, TimingsService, DateScalar],
  exports: [TimingsService],
})
export class TimingsModule {}
