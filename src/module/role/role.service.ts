import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import formatSearch from '@/utils/formatSearch';

@Injectable()
export class RoleService {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async createRole(body: any) {
    const role = await this.prisma.role.findUnique({
      where: {
        ...body
      }
    });

    if (role) throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);

    return await this.prisma.role.create({ data: { ...body } });
  }

  async roleList(body: any) {
    const { pageInfo, param } = formatSearch(body);
    const total = await this.prisma.role.count();
    const record = await this.prisma.role.findMany({
      ...pageInfo,
      where: { ...param }
    });

    return { total, record };
  }

  roleUser(id: string) {
    console.log(id);
  }
}
