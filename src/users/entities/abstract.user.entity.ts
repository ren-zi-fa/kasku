import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractUserEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;

  @CreateDateColumn()
  @Exclude()
  public updatedAt: Date;

  @Column({ name: 'password', length: 100 })
  @Exclude()
  public password: string;

 
}
