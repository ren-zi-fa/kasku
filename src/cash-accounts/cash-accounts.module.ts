import { Module } from '@nestjs/common';
import { CashAccountsService } from './cash-accounts.service';
import { CashAccountsController } from './cash-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashAccount } from './entities/cash-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashAccount])],
  controllers: [CashAccountsController],
  providers: [CashAccountsService],
})
export class CashAccountsModule {}
