import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MeetingRoomDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MeetingRoomService {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  /**
   * @description 创建会议室
   */
  async createMeeting(body: MeetingRoomDto) {
    const meeting = await this.prisma.meeting_Room.findUnique({
      where: {
        name: body.name
      }
    });

    if (meeting)
      throw new HttpException('会议室已存在', HttpStatus.BAD_REQUEST);
    return await this.prisma.meeting_Room.create({
      data: {
        name: body.name,
        location: body.location,
        capacity: body.capacity,
        description: body.description,
        equipment: body.equipment
      }
    });
  }

  /**
   * @description 获取全部会议室
   */
  async meetingAll() {
    return await this.prisma.meeting_Room.findMany();
  }

  async meetingPageList(body: any) {
    const pageNo = Number(body.pageNo);
    const pageSize = Number(body.pageSize);

    const total = await this.prisma.meeting_Room.count();
    const meetingList = await this.prisma.meeting_Room.findMany({
      skip: (pageNo - 1) * pageSize,
      take: pageNo,
      where: {
        name: body?.name,
        location: body?.location
      }
    });

    return {
      record: meetingList,
      total
    };
  }
}