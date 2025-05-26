import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEnum } from 'class-validator';
import { CashTransaction } from 'src/cash-transaction/entities/cash-transaction.entity';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('transaction_category')
export class TransactionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @IsEnum(TransactionType, { message: 'type harus income atau expense' })
  @Column({ type: 'varchar' }) 
  type: TransactionType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => CashTransaction, (tx) => tx.category)
  cashTransactions: CashTransaction[];
}
