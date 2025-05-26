import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTransactionCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
