import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '@/shared/entity/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键,自增',
  })
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 255,
    comment: '用户名称',
    default: '',
  })
  @IsNotEmpty()
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    comment: '用户密码',
    default: '',
  })
  @IsNotEmpty()
  password: string;
}
