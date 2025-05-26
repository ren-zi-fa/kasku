import { IsIn, IsNotEmpty, IsOptional, isString, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\\#])[A-Za-z\d@$!%*?&\\#]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
    },
  )
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsOptional()
  @IsString()
  @IsIn(['staff', 'admin', 'manager'], {
    message: 'role must be one of: staff, admin, manager',
  })
  role?: string = 'staff';
}
