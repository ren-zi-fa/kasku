import { Module } from '@nestjs/common';
import { CashBalanceLogsService } from './cash-balance-logs.service';
import { CashBalanceLogsController } from './cash-balance-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashBalanceLog } from './entities/cash-balance-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashBalanceLog])],
  controllers: [CashBalanceLogsController],
  providers: [CashBalanceLogsService],
})
export class CashBalanceLogsModule {}
