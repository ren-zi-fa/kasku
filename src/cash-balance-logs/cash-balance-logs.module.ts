import { Module } from '@nestjs/common';
import { CashBalanceLogsService } from './cash-balance-logs.service';
import { CashBalanceLogsController } from './cash-balance-logs.controller';

@Module({
  controllers: [CashBalanceLogsController],
  providers: [CashBalanceLogsService],
})
export class CashBalanceLogsModule {}
