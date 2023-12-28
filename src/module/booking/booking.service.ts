import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import formatSearch from '@/utils/formatSearch';

@Injectable()
export class BookingService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(createBookingDto: any) {
    return await this.prisma.booking.create({
      data: { ...createBookingDto }
    });
  }

  async bookingList(body: any) {
    const { pageInfo, param } = formatSearch(body);
    const total = await this.prisma.booking.count({});
    const record = await this.prisma.booking.findMany({
      ...pageInfo,
      where: {
        ...param
      },
      include: {
        room: true,
        user: true
      }
    });

    return {
      total,
      record: record.map(v => {
        const param: any = { ...v };
        param.nick_name = v.user.nick_name;
        param.username = v.user.username;
        param.room_name = v.room.name;
        delete param.user;
        delete param.room;
        return {
          ...param
        };
      })
    };
  }
}
