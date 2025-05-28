import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() userData: CreateUserDto) {
    return this.authService.signup(userData);
  }
  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    return this.authService.login(loginData);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request) {
    const user = request['user'];
    return {
      user,
    };
  }
}
