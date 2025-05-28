import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async signup(userData: CreateUserDto) {
    const { password, username } = userData;

    const isUsernameFound = await this.usersService.findByUsername(username);
    if (isUsernameFound) {
      throw new BadRequestException('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    const user = await this.usersService.create(newUser);
    if (!user) {
      throw new BadRequestException('User creation failed');
    }

    const { password: _, ...userWithoutPassword } = user;

    const payload = {
      id: user.id,
      role: user.role,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async login({ username, password }: { username: string; password: string }) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;

    const payload = {
      id: user.id,
      role: user.role,
      username: user.username,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      user,
    };
  }


}
