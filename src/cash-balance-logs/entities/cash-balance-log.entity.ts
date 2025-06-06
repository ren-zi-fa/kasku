import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { CashAccount } from '../../cash-accounts/entities/cash-account.entity';
import { CashTransaction } from 'src/cash-transaction/entities/cash-transaction.entity';

@Entity('cash_balance_log')
export class CashBalanceLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'logged_at' })
  loggedAt: Date;

  @Column({
    type: 'numeric',
    precision: 14,
    scale: 2,
    default: 0,
    name: 'balance_after',
  })
  balanceAfter: string;

  @ManyToOne(() => CashAccount, (acc) => acc.cash_balance_log)
  cash_account: CashAccount;

  @ManyToOne(() => CashTransaction, (tx) => tx.cash_balance_log)
  cash_transaction: CashTransaction;
}
