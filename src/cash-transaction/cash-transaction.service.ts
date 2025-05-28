import { Injectable } from '@nestjs/common';
import { CreateCashTransactionDto } from './dto/create-cash-transaction.dto';
import { UpdateCashTransactionDto } from './dto/update-cash-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CashTransaction } from './entities/cash-transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CashAccount } from 'src/cash-accounts/entities/cash-account.entity';
import { TransactionCategory } from 'src/transaction-categories/entities/transaction-category.entity';

@Injectable()
export class CashTransactionService {
  constructor(
    @InjectRepository(CashTransaction)
    private readonly cashTransactionRepository: Repository<CashTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CashAccount)
    private readonly cashAccountRepository: Repository<CashAccount>,
    @InjectRepository(TransactionCategory)
    private readonly transactionCategoryRepository: Repository<TransactionCategory>,
  ) {}

  async create(createCashTransactionDto: CreateCashTransactionDto) {
    const user = await this.userRepository.findOne({
      where: { id: createCashTransactionDto.userId },
    });
    const account = await this.cashAccountRepository.findOne({
      where: { id: createCashTransactionDto.cashAccountId },
    });
    const category = await this.transactionCategoryRepository.findOne({
      where: { id: createCashTransactionDto.categoryId },
    });
    const transaction = this.cashTransactionRepository.create({
      description: createCashTransactionDto.description,
      amount: createCashTransactionDto.amount,
      type: createCashTransactionDto.type,
      transactionDate: createCashTransactionDto.transactionDate,
      cashAccount: account,
      category: category,
      user,
    });
    const saved = await this.cashTransactionRepository.save(transaction);

    return {
      id: saved.id,
      description: saved.description,
      amount: saved.amount,
      type: saved.type,
      transactionDate: saved.transactionDate,
      createdAt: saved.createdAt,
    };
  }

  findAll() {
    return this.cashTransactionRepository.find({
      relations: ['user', 'cashAccount', 'category'],
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
