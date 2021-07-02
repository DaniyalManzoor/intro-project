import { Controller, Get } from '@nestjs/common';
import { Users } from './user.module';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): Users[] {
    return this.userService.getUser();
  }
}
