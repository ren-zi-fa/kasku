import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCashBalanceLogDto {
  @IsNotEmpty()
  @IsNumberString()
  cashAccountId: string;

  @IsNotEmpty()
  @IsNumberString()
  amount: string;

  @IsString()
  @IsOptional()
  description?: string;
}
