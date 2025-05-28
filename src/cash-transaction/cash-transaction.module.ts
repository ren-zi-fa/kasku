import { Module } from '@nestjs/common';
import { CashTransactionService } from './cash-transaction.service';
import { CashTransactionController } from './cash-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashTransaction } from './entities/cash-transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { CashAccount } from 'src/cash-accounts/entities/cash-account.entity';
import { TransactionCategory } from 'src/transaction-categories/entities/transaction-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashTransaction, User, CashAccount,TransactionCategory])],
  controllers: [CashTransactionController],
  providers: [CashTransactionService],
})
export class CashTransactionModule {}
