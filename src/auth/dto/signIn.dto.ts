import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  username: string;

  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  password: string;
}
