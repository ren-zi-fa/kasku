import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashAccount } from './entities/cash-account.entity';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';

@Injectable()
export class CashAccountsService {
  constructor(
    @InjectRepository(CashAccount)
    private readonly cashAccountRepository: Repository<CashAccount>,
  ) {}

  async create(createCashAccountDto: CreateCashAccountDto) {
    const cashAccount = this.cashAccountRepository.create(createCashAccountDto);
    return this.cashAccountRepository.save(cashAccount);
  }

  async findAll() {
    return this.cashAccountRepository.find();
  }

  async findOne(id: number) {
    const cashAccount = await this.cashAccountRepository.findOne({
      where: { id },
      relations: ['cashTransactions', 'balanceLogs'],
    });
    if (!cashAccount) {
      throw new NotFoundException(`CashAccount with id ${id} not found`);
    }
    return cashAccount;
  }

  async update(id: number, updateCashAccountDto: UpdateCashAccountDto) {
    const cashAccount = await this.cashAccountRepository.preload({
      id,
      ...updateCashAccountDto,
    });
    if (!cashAccount) {
      throw new NotFoundException(`CashAccount with id ${id} not found`);
    }
    return this.cashAccountRepository.save(cashAccount);
  }

  async remove(id: number) {
    const cashAccount = await this.cashAccountRepository.findOne({
      where: { id },
    });
    if (!cashAccount) {
      throw new NotFoundException(`CashAccount with id ${id} not found`);
    }
    await this.cashAccountRepository.remove(cashAccount);
    return { message: `CashAccount with id ${id} has been removed` };
  }
}
