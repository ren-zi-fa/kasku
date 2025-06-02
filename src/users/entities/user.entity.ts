import { CashTransaction } from 'src/cash-transaction/entities/cash-transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractUserEntity } from './abstract.user.entity';

@Entity('users')
export class User extends AbstractUserEntity {
  @Column({ length: 50, unique: true })
  public username: string;

  @Column({ length: 20, default: 'staff' })
  public role: string;

  @OneToMany(() => CashTransaction, (tx) => tx.user)
  public cashTransactions: CashTransaction[];
}
