import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CashTransactionService } from './cash-transaction.service';
import { CreateCashTransactionDto } from './dto/create-cash-transaction.dto';
import { UpdateCashTransactionDto } from './dto/update-cash-transaction.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cash-transaction')
export class CashTransactionController {
  constructor(
    private readonly cashTransactionService: CashTransactionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Req() req,
    @Body() createCashTransactionDto: CreateCashTransactionDto,
  ) {
    const userId = req.user.id;

    return this.cashTransactionService.create(createCashTransactionDto, userId);
  }

  @Get()
  findAll() {
    return this.cashTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCashTransactionDto: UpdateCashTransactionDto,
  ) {
    return this.cashTransactionService.update(+id, updateCashTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashTransactionService.remove(+id);
  }
}
