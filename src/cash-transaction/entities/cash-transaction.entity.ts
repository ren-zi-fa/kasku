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
import { AbstractCashTransactionEntity } from './abstract.cash-transaction.entity';
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
@Entity('cash_transaction')
export class CashTransaction extends AbstractCashTransactionEntity {
  @Column({ type: 'text' })
  public description: string;

  @IsEnum(TransactionType, { message: 'type harus income atau expense' })
  @Column({ type: 'varchar' })
  public type: TransactionType;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  public amount: string;

  @ManyToOne(() => User, (user) => user.cash_transaction)
  public user: User;

  @ManyToOne(() => CashAccount, (acc) => acc.cash_transaction)
  public cash_account: CashAccount;

  @ManyToOne(() => TransactionCategory, (cat) => cat.cash_transaction)
  public transaction_category: TransactionCategory;

  @OneToMany(() => CashBalanceLog, (log) => log.cash_transaction)
  public cash_balance_log: CashBalanceLog[];
}
