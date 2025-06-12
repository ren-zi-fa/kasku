import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAllUsers(query: PaginationQueryDto) {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = 'id',
      order = 'ASC',
      filters,
    } = query;

    const qb = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.cash_transaction',
      'cash_transaction',
    );

    if (search) {
      qb.andWhere('user.username LIKE :search', { search: `%${search}%` });
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        qb.andWhere(`user.${key} = :${key}`, { [key]: value });
      });
    }

    qb.orderBy(
      `user.${sortBy}`,
      order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
    );
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    const pageCount = Math.ceil(total / limit);
    const hasNext = page < pageCount;
    const hasPrev = page > 1;

    return {
      data,
      meta: {
        total,
        page,
        limit,
        pageCount,
        hasNext,
        hasPrev,
      },
    };
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.findOneBy({ id });
  }

  async findUsersByUserName(username: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.username ILIKE :username', { username: `%${username}%` })
      .getOne();
  }
}
