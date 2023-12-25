import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MeetingRoomDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import formatSearch from '../../utils/formatSearch';

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
    const { param, pageInfo } = formatSearch(body);

    const total = await this.prisma.meeting_Room.count({
      where: {
        is_delete: false
      }
    });
    const meetingList = await this.prisma.meeting_Room.findMany({
      ...pageInfo,
      where: {
        ...param,
        is_delete: false
      },
      orderBy: {
        create_time: 'desc'
      }
    });

    return {
      record: meetingList,
      total
    };
  }

  async deleteMeeting(id: number) {
    return await this.prisma.meeting_Room.update({
      where: {
        id
      },
      data: {
        is_delete: true
      }
    });
  }
}
