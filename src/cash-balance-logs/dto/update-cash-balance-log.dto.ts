import { PartialType } from '@nestjs/mapped-types';
import { CreateCashBalanceLogDto } from './create-cash-balance-log.dto';

export class UpdateCashBalanceLogDto extends PartialType(CreateCashBalanceLogDto) {}
