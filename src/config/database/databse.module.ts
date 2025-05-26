import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { User } from 'src/users/entities/user.entity';
import { CashAccount } from 'src/cash-accounts/entities/cash-account.entity';
import { CashBalanceLog } from 'src/cash-balance-logs/entities/cash-balance-log.entity';
import { TransactionCategory } from 'src/transaction-categories/entities/transaction-category.entity';
import { CashTransaction } from 'src/cash-transaction/entities/cash-transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        User,
        CashAccount,
        CashBalanceLog,
        TransactionCategory,
        CashTransaction,
      ],

      synchronize: true,
      logging: true,
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
