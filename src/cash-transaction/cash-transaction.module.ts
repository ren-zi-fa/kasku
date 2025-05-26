import { Module } from '@nestjs/common';
import { CashTransactionService } from './cash-transaction.service';
import { CashTransactionController } from './cash-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashTransaction } from './entities/cash-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashTransaction])],
  controllers: [CashTransactionController],
  providers: [CashTransactionService],
})
export class CashTransactionModule {}
