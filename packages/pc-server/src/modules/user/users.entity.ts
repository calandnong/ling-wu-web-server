import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
    name: 'nick_name',
    type: 'varchar',
    length: 255,
    comment: '用户昵称',
    default: '',
  })
  nickName: string;
}
