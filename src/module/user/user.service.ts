import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { md5 } from '../../utils/createMd5';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

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
}
