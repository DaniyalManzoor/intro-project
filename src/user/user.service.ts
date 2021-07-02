import { Get, Injectable } from '@nestjs/common';
import { Users } from './user.module';

@Injectable()
export class UserService {
  private user: Users[] = [
    {
      name: 'Daniyal',
      designation: 'Web and Mobile Engineer',
    },
  ];

  @Get()
  getUser() {
    return this.user;
  }
}
