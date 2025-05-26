import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CashAccountsModule } from './cash-accounts/cash-accounts.module';
import { TransactionCategoriesModule } from './transaction-categories/transaction-categories.module';
import { CashTransactionModule } from './cash-transaction/cash-transaction.module';
import { CashBalanceLogsModule } from './cash-balance-logs/cash-balance-logs.module';
import { DatabaseModule } from './config/database/databse.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    CashAccountsModule,
    TransactionCategoriesModule,
    CashTransactionModule,
    CashBalanceLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
