import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashBalanceLog } from './entities/cash-balance-log.entity';
import { CreateCashBalanceLogDto } from './dto/create-cash-balance-log.dto';
import { UpdateCashBalanceLogDto } from './dto/update-cash-balance-log.dto';

@Injectable()
export class CashBalanceLogsService {
  constructor(
    @InjectRepository(CashBalanceLog)
    private readonly cashBalanceLogRepository: Repository<CashBalanceLog>,
  ) {}

  async create(createDto: CreateCashBalanceLogDto) {
    const log = this.cashBalanceLogRepository.create({
      ...createDto,
      cashAccount: { id: +createDto.cashAccountId },
    });
    return this.cashBalanceLogRepository.save(log);
  }

  async findAll() {
    return this.cashBalanceLogRepository.find({ relations: ['cashAccount'] });
  }

  async findOne(id: number) {
    const log = await this.cashBalanceLogRepository.findOne({
      where: { id },
      relations: ['cashAccount'],
    });
    if (!log) {
      throw new NotFoundException(`CashBalanceLog with id ${id} not found`);
    }
    return log;
  }

  async update(id: number, updateDto: UpdateCashBalanceLogDto) {
    const log = await this.cashBalanceLogRepository.preload({
      id,
      ...updateDto,
      cashAccount: updateDto.cashAccountId
        ? { id: +updateDto.cashAccountId }
        : undefined,
    });
    if (!log) {
      throw new NotFoundException(`CashBalanceLog with id ${id} not found`);
    }
    return this.cashBalanceLogRepository.save(log);
  }

  async remove(id: number) {
    const log = await this.cashBalanceLogRepository.findOne({ where: { id } });
    if (!log) {
      throw new NotFoundException(`CashBalanceLog with id ${id} not found`);
    }
    await this.cashBalanceLogRepository.remove(log);
    return { message: `CashBalanceLog with id ${id} has been removed` };
  }
}
