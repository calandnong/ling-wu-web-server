import { CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    nullable: false,
    comment: '创建时间',
  })
  createTime: Timestamp;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    nullable: false,
    comment: '更新时间',
  })
  updateTime: Timestamp;
}
