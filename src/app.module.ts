import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CashAccountsModule } from './cash-accounts/cash-accounts.module';
import { TransactionCategoriesModule } from './transaction-categories/transaction-categories.module';
import { CashTransactionModule } from './cash-transaction/cash-transaction.module';
import { CashBalanceLogsModule } from './cash-balance-logs/cash-balance-logs.module';
import { DatabaseModule } from './config/database/databse.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'default',
            ttl: config.get('THROTTLE_TTL'),
            limit: config.get('THROTTLE_LIMIT'),
          },
        ],
      }),
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
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
