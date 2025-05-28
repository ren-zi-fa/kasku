import {
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionType } from '../entities/transaction-category.entity';

export class CreateTransactionCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionType, { message: 'type harus income atau expense' })
  type: TransactionType;
}
