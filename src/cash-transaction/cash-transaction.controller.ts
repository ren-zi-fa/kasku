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
  Query,
} from '@nestjs/common';
import { CashTransactionService } from './cash-transaction.service';
import { CreateCashTransactionDto } from './dto/create-cash-transaction.dto';
import { UpdateCashTransactionDto } from './dto/update-cash-transaction.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

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
  async findAll(@Query() query: PaginationQueryDto) {
    if (typeof query.filters === 'string') {
      try {
        query.filters = JSON.parse(query.filters);
      } catch (error) {
        query.filters = {};
      }
    }
    return this.cashTransactionService.findAll(query);
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
