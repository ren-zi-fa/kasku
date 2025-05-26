import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CashBalanceLog } from '../../cash-balance-logs/entities/cash-balance-log.entity';
import { CashTransaction } from 'src/cash-transaction/entities/cash-transaction.entity';

@Entity('cash_account')
export class CashAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  balance: string;

  @OneToMany(() => CashTransaction, (tx) => tx.cashAccount)
  cashTransactions: CashTransaction[];

  @OneToMany(() => CashBalanceLog, (log) => log.cashAccount)
  balanceLogs: CashBalanceLog[];
}
