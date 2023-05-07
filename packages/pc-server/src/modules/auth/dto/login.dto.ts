import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ name: '用户昵称', example: '用户昵称' })
  readonly nickName: string;
}
