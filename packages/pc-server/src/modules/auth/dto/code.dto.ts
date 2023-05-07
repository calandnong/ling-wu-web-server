import { ApiProperty } from '@nestjs/swagger';

export class CodeDto {
  @ApiProperty({ description: '手机号', example: '186526xxssx' })
  readonly phone: string;
}
