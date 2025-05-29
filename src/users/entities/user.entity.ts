import { CashTransaction } from 'src/cash-transaction/entities/cash-transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ name: 'password', length: 100})
  password: string;

  @Column({ length: 20, default: 'staff' })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => CashTransaction, (tx) => tx.user)
  cashTransactions: CashTransaction[];
}
