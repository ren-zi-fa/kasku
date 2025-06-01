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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    DatabaseModule,
    CashAccountsModule,
    TransactionCategoriesModule,
    CashTransactionModule,
    CashBalanceLogsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
