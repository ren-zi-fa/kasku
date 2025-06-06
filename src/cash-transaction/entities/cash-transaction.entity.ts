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
} from 'typeorm';
import { AbstractCashTransactionEntity } from './abstract.cash-transaction';
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
@Entity('cash_transaction')
export class CashTransaction extends AbstractCashTransactionEntity {
  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ name: 'transaction_date' })
  transactionDate: Date;

  @IsEnum(TransactionType, { message: 'type harus income atau expense' })
  @Column({ type: 'varchar' })
  type: TransactionType;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  amount: string;

  @ManyToOne(() => User, (user) => user.cash_transaction)
  user: User;

  @ManyToOne(() => CashAccount, (acc) => acc.cash_transaction)
  cash_account: CashAccount;

  @ManyToOne(() => TransactionCategory, (cat) => cat.cash_transaction)
  transaction_category: TransactionCategory;

  @OneToMany(() => CashBalanceLog, (log) => log.cash_transaction)
  cash_balance_log: CashBalanceLog[];
}
