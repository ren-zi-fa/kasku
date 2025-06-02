import {
  IsEnum,
  isInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionType } from '../entities/cash-transaction.entity';
import { Type } from 'class-transformer';

export class CreateCashTransactionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionType, { message: 'type harus income atau expense' })
  type: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  amount: string;

  @IsNumber()
  @IsNotEmpty()
  cashAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  transactionDate?: Date;
}
