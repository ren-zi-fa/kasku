import { Exclude } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class AbstractCashTransactionEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @CreateDateColumn({ name: 'transaction_date' })
  @Exclude()
  public transactionDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  public createdAt: Date;
}
