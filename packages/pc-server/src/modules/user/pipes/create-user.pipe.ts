import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    return value;
  }
}
