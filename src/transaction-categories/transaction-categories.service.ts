import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionCategory } from './entities/transaction-category.entity';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';

@Injectable()
export class TransactionCategoriesService {
  constructor(
    @InjectRepository(TransactionCategory)
    private readonly transactionCategoryRepository: Repository<TransactionCategory>,
  ) {}

  async create(createDto: CreateTransactionCategoryDto) {
    const category = this.transactionCategoryRepository.create(createDto);
    return this.transactionCategoryRepository.save(category);
  }

  async findAll() {
    return this.transactionCategoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.transactionCategoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(
        `TransactionCategory with id ${id} not found`,
      );
    }
    return category;
  }

  async update(id: number, updateDto: UpdateTransactionCategoryDto) {
    const category = await this.transactionCategoryRepository.preload({
      id,
      ...updateDto,
    });
    if (!category) {
      throw new NotFoundException(
        `TransactionCategory with id ${id} not found`,
      );
    }
    return this.transactionCategoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.transactionCategoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(
        `TransactionCategory with id ${id} not found`,
      );
    }
    await this.transactionCategoryRepository.remove(category);
    return { message: `TransactionCategory with id ${id} has been removed` };
  }
}
