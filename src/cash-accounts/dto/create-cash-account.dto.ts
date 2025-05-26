import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCashAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  balance?: string;
}
