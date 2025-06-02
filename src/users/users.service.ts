import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(query: PaginationQueryDto) {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = 'id',
      order = 'ASC',
      filters,
    } = query;
    const qb = this.userRepository.createQueryBuilder('user');

    if (search) {
      qb.andWhere('user.username LIKE :search', { search: `%${search}%` });
    }

    // Dynamic filter (contoh filters = { role: 'admin' })
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        // Bisa buat validasi key dulu agar aman
        qb.andWhere(`user.${key} = :${key}`, { [key]: value });
      });
    }

    // Sorting
    qb.orderBy(
      `user.${sortBy}`,
      order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
    );

    // Pagination
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.remove(user);
    return { message: `User with id ${id} has been removed` };
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
