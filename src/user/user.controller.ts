import { Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get()
  test() {
    console.log(111);
    return 11;
  }

  @Post('register')
  async register() {
    return this.userService.register();
  }
}
