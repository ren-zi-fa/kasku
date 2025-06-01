import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  create(@Body() userData: CreateUserDto) {
    return this.authService.signup(userData);
  }
  @Public()
  @Post('login')
  async login(@Body() signinInData: SignInDto) {
    return this.authService.login(signinInData);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
