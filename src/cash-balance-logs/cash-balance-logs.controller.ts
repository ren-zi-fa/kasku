import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashBalanceLogsService } from './cash-balance-logs.service';
import { CreateCashBalanceLogDto } from './dto/create-cash-balance-log.dto';
import { UpdateCashBalanceLogDto } from './dto/update-cash-balance-log.dto';

@Controller('cash-balance-logs')
export class CashBalanceLogsController {
  constructor(private readonly cashBalanceLogsService: CashBalanceLogsService) {}

  @Post()
  create(@Body() createCashBalanceLogDto: CreateCashBalanceLogDto) {
    return this.cashBalanceLogsService.create(createCashBalanceLogDto);
  }

  @Get()
  findAll() {
    return this.cashBalanceLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashBalanceLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashBalanceLogDto: UpdateCashBalanceLogDto) {
    return this.cashBalanceLogsService.update(+id, updateCashBalanceLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashBalanceLogsService.remove(+id);
  }
}
