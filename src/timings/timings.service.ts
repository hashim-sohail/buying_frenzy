import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewTimingInput } from './dto/new-timing.input';
import { TimingsArgs } from './dto/timings.args';
import { Timing } from './models/timing.model';

@Injectable()
export class TimingsService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  constructor(
    @InjectRepository(Timing)
    private readonly timingRepository: Repository<Timing>,
  ) {}

  async create(data: NewTimingInput): Promise<Timing> {
    this.timingRepository.create(data);
    return this.timingRepository.save(data);
  }

  async findOneById(id: string): Promise<Timing> {
    return {} as any;
  }

  async findAll(timingsArgs: TimingsArgs): Promise<Timing[]> {
    return [] as Timing[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
