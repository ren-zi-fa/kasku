import { Injectable } from '@nestjs/common';
import { CreateCashTransactionDto } from './dto/create-cash-transaction.dto';
import { UpdateCashTransactionDto } from './dto/update-cash-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CashTransaction } from './entities/cash-transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CashTransactionService {
  constructor(
    @InjectRepository(CashTransaction)
    private readonly cashTransactionRepository: Repository<CashTransaction>,
  ) {}

  create(createCashTransactionDto: CreateCashTransactionDto) {
    const trx = this.cashTransactionRepository.create(createCashTransactionDto);
    return this.cashTransactionRepository.save(trx);
  }

  findAll() {
    return this.cashTransactionRepository.find({
      relations: ['user', 'cashAccount', 'category', 'balanceLogs'],
    });
  }

  findOne(id: number) {
    return this.cashTransactionRepository.findOne({
      where: { id },
      relations: ['user', 'cashAccount', 'category', 'balanceLogs'],
    });
  }

  async update(id: number, updateCashTransactionDto: UpdateCashTransactionDto) {
    await this.cashTransactionRepository.update(id, updateCashTransactionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.cashTransactionRepository.delete(id);
    return { deleted: true };
  }
}
