import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  // @Length(6, 20)
  @ApiProperty({ description: '用户名', example: '张三' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @ApiProperty({ description: '用户密码', example: '123456' })
  password: string;
}
