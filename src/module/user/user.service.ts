import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { md5 } from '../../utils/createMd5';
import { JwtService } from '@nestjs/jwt';
import formatSearch from '../../utils/formatSearch';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  /**
   * @description 用户注册
   */
  async register(registerUser: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: registerUser.username
      }
    });

    if (user) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.user.create({
      data: {
        email: registerUser.email,
        password: md5(registerUser.password),
        phone_number: registerUser.phone_number,
        nick_name: registerUser.nick_name,
        username: registerUser.username
      }
    });
  }

  /**
   * @description 用户登录
   */
  async login(userLogin: any) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        username: userLogin.username
      }
    });

    if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);

    if (md5(userLogin.password) !== user.password)
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);

    user.accessToken = this.jwtService.sign(
      {
        userId: user.id,
        username: user.username
      },
      {
        expiresIn: '1h'
      }
    );
    return user;
  }

  /**
   * @description 获取用户信息
   */
  async getUserInfo(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);

    return user;
  }

  /**
   * @description 冻结用户
   */
  async freezeUser(id: number, frozen: number) {
    await this.getUserInfo(id);
    return await this.prisma.user.update({
      where: { id },
      data: { is_frozen: Boolean(frozen) }
    });
  }

  /**
   * @description 分页查询用户
   */
  async getUserList(body: any) {
    const { param, pageInfo } = formatSearch(body);

    const userList = await this.prisma.user.findMany({
      ...pageInfo,
      where: {
        ...param
      }
    });
    const total = await this.prisma.user.count();
    return {
      record: userList,
      total
    };
  }

  /**
   * @description 获取全部用户信息
   */
  async getAllUserList() {
    return this.prisma.user.findMany({
      where: {
        is_frozen: false
      }
    });
  }
}
