import { Injectable } from '@nestjs/common';
import { CreateCashTransactionDto } from './dto/create-cash-transaction.dto';
import { UpdateCashTransactionDto } from './dto/update-cash-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CashTransaction } from './entities/cash-transaction.entity';
import { Brackets, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CashAccount } from 'src/cash-accounts/entities/cash-account.entity';
import { TransactionCategory } from 'src/transaction-categories/entities/transaction-category.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

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

  async create(
    createCashTransactionDto: CreateCashTransactionDto,
    userId: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
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
      cash_account: account,
      transaction_category: category,
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

  async findAll(query: PaginationQueryDto) {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = 'id',
      order = 'ASC',
      filters,
    } = query;

    const qb =
      this.cashTransactionRepository.createQueryBuilder('cash_transaction');

    // LEFT JOIN relasi
    qb.leftJoin('cash_transaction.user', 'user')
      .leftJoin('cash_transaction.cash_account', 'cash_account')
      .leftJoin(
        'cash_transaction.transaction_category',
        'transaction_category',
      );

    // Filter by search keyword
    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('cash_transaction.description ILIKE :search', {
            search: `%${search}%`,
          })
            .orWhere('user.username ILIKE :search', { search: `%${search}%` })
            .orWhere('cash_account.name ILIKE :search', {
              search: `%${search}%`,
            })
            .orWhere('transaction_category.name ILIKE :search', {
              search: `%${search}%`,
            });
        }),
      );
    }

    // Dynamic filters (optional)
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        qb.andWhere(`cash_transaction.${key} = :${key}`, { [key]: value });
      });
    }

    // Sorting
    qb.orderBy(
      `cash_transaction.${sortBy}`,
      order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
    );

    // Pagination
    qb.skip((page - 1) * limit).take(limit);

    // Debugging (optional)
    // console.log(qb.getSql(), qb.getParameters());

    const [data, total] = await qb.getManyAndCount();

    return {
      data: data,
      meta:{
        total,
        page,
        limit
      }
    };
  }

  findOne(id: number) {
    return this.cashTransactionRepository.findOne({
      where: { id },
      relations: ['user', 'cash_account', 'category', 'cash_balance_log'],
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
