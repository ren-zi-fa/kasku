import { Injectable } from '@nestjs/common';
import { CreateCashBalanceLogDto } from './dto/create-cash-balance-log.dto';
import { UpdateCashBalanceLogDto } from './dto/update-cash-balance-log.dto';

@Injectable()
export class CashBalanceLogsService {
  create(createCashBalanceLogDto: CreateCashBalanceLogDto) {
    return 'This action adds a new cashBalanceLog';
  }

  findAll() {
    return `This action returns all cashBalanceLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashBalanceLog`;
  }

  update(id: number, updateCashBalanceLogDto: UpdateCashBalanceLogDto) {
    return `This action updates a #${id} cashBalanceLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashBalanceLog`;
  }
}
