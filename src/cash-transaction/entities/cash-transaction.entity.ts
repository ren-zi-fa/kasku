import { IsEnum } from 'class-validator';
import { CashAccount } from 'src/cash-accounts/entities/cash-account.entity';
import { CashBalanceLog } from 'src/cash-balance-logs/entities/cash-balance-log.entity';
import { TransactionCategory } from 'src/transaction-categories/entities/transaction-category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
@Entity('cash_transaction')
export class CashTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: number;

  @CreateDateColumn({ name: 'transaction_date' })
  transactionDate: Date;

  @IsEnum(TransactionType, { message: 'type harus income atau expense' })
  type: TransactionType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  amount: string;

  @ManyToOne(() => User, (user) => user.cashTransactions)
  user: User;

  @ManyToOne(() => CashAccount, (acc) => acc.cashTransactions)
  cashAccount: CashAccount;

  @ManyToOne(() => TransactionCategory, (cat) => cat.cashTransactions)
  category: TransactionCategory;

  @OneToMany(() => CashBalanceLog, (log) => log.cashTransaction)
  balanceLogs: CashBalanceLog[];
}
