import { Exclude } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractCashTransactionEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @CreateDateColumn({ name: 'transaction_date' })
  public transaction_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;
}
