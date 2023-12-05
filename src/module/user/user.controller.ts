import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto, UserLoginDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('用户管理模块')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  /**
   * @description 注册
   */
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '注册成功/失败',
    type: String
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '验证码已失效/验证码不正确/用户已存在',
    type: String
  })
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return this.userService.register(registerUser);
  }

  /**
   * @description 登录
   */
  @Post('login')
  async login(@Body() userLogin: UserLoginDto) {
    return this.userService.login(userLogin);
  }

  /**
   * @description 获取用户信息
   */
  @Get(':id')
  async getUserInfo(@Param('id') id: string) {
    return await this.userService.getUserInfo(Number(id));
  }

  /**
   * @description 冻结/启用 用户
   */
  @Get('freeze/:id')
  async freezeUser(@Param('id') id: string, @Query('frozen') frozen: string) {
    return await this.userService.freezeUser(Number(id), Number(frozen));
  }

  /**
   * @description 获取用户列表
   */
  @Post('list')
  async getUserList(@Body() body: any) {
    return await this.userService.getUserList(body);
  }

  /**
   * @description 获取全部用户，且非冻结的用户
   */

  @Get('list/all')
  async getAllUserList() {
    return await this.userService.getAllUserList();
  }
}
