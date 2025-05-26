import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionType } from '../entities/cash-transaction.entity';

export class CreateCashTransactionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TransactionType, { message: 'type harus income atau expense' })
  type: TransactionType;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  cashAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  transactionDate?: Date;
}
