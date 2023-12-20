import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DictService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async createDict(body: any) {
    const dictItem = await this.prisma.dictionary_type.findUnique({
      where: {
        type_name: body.type_name
      }
    });

    if (dictItem) throw new HttpException('字典已存在', HttpStatus.BAD_REQUEST);

    return await this.prisma.dictionary_type.create({
      data: {
        ...body
      }
    });
  }

  async addFields(body: any) {
    const dict_item = body.dict_item;
    const type_id = Number(body.type_id);
    const operations = dict_item.map(v =>
      this.prisma.dictionary_item.create({ data: { ...v, type_id } })
    );

    return await this.prisma.batchAddition(operations);
  }

  async getDict(id: string) {
    return await this.prisma.dictionary_type.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        items: true
      }
    });
  }
}
